<script setup>
import { onMounted, nextTick, watch } from 'vue';
import LogoWhite from '@/components/icons/LogoWhite.vue';
import DefaultAvatar from '@/components/icons/DefaultAvatar.vue';
import { useUserStore } from '@/store/user.store';

const { user, loading } = useUserStore();

onMounted(() => {
    nextTick(() => {
        initNavClose();
        initCalculator();
        initFullscreen();
        initProfileSidebar();
        initHeaderCollapse();
    });
});

const initNavClose = () => {
    const navCloseBtn = document.getElementById('navClose');
    if (navCloseBtn) {
        navCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const mainSidebar = document.querySelector('.main-sidebar');
            const header = document.querySelector('.header');
            const logo = document.querySelector('.header .main-logo');
            
            if (window.innerWidth > 1199) {
                // Desktop behavior
                mainSidebar?.classList.toggle('collapsed');
                header?.classList.toggle('expanded');
                document.body.classList.toggle('body-padding');
                document.body.classList.toggle('expanded');
                
                // Handle scrollbar
                const sidebarMenu = document.querySelector('.sidebar-menu');
                if (mainSidebar?.classList.contains('collapsed')) {
                    // Destroy scrollbar when collapsed
                    if (sidebarMenu && typeof OverlayScrollbars !== 'undefined') {
                        const instance = OverlayScrollbars(sidebarMenu);
                        if (instance) instance.destroy();
                    }
                } else {
                    // Init scrollbar when expanded
                    if (sidebarMenu && typeof OverlayScrollbars !== 'undefined') {
                        OverlayScrollbars(sidebarMenu, {});
                    }
                }
            } else {
                // Mobile behavior
                mainSidebar?.classList.toggle('sidebar-mini');
            }
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-sidebar') && !e.target.closest('#navClose')) {
                const mainSidebar = document.querySelector('.main-sidebar');
                if (window.innerWidth < 1200) {
                    mainSidebar?.classList.remove('sidebar-mini');
                }
            }
        });
        
        // Initialize body-padding class on mount
        if (window.innerWidth > 1199) {
            document.body.classList.add('body-padding');
        }
    }
};

const initCalculator = () => {
    const calcBox = document.querySelector('.dgb-calc-box');
    if (!calcBox) return;
    
    const input = document.getElementById('dgbCalcResult');
    const cells = calcBox.querySelectorAll('td');
    let lastInputIsSymbol = false;
    
    const isSymbol = (char) => ['+', '-', '*', '/'].includes(char);
    
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const num = cell.innerHTML;
            
            if (isSymbol(num) && lastInputIsSymbol) return;
            
            if (num === '=') {
                let value = input.value;
                if (isSymbol(value[value.length - 1])) {
                    value = value.slice(0, -1);
                }
                try {
                    input.value = eval(value);
                } catch (e) {
                    input.value = 'Error';
                }
            } else if (num === 'C') {
                input.value = '';
            } else if (num === 'CE') {
                input.value = input.value.slice(0, -1);
            } else {
                input.value += num;
            }
            
            lastInputIsSymbol = isSymbol(num);
        });
    });
};

const initFullscreen = () => {
    const fullscreenBtn = document.getElementById('btnFullscreen');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            const elem = document.documentElement;
            
            if (!document.fullscreenElement && !document.mozFullScreenElement &&
                !document.webkitFullscreenElement && !document.msFullscreenElement) {
                // Enter fullscreen
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                }
                this.classList.add('full-screen');
                this.innerHTML = '<i class="fa-light fa-compress"></i>';
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                this.classList.remove('full-screen');
                this.innerHTML = '<i class="fa-light fa-expand"></i>';
            }
        });
    }
};

const initProfileSidebar = () => {
    const seeAsSidebarCheckbox = document.getElementById('seeProfileAsSidebar');
    const seeAsDropdownCheckbox = document.getElementById('seeProfileAsDropdown');
    const profileRightSidebar = document.querySelector('.profile-right-sidebar');
    const rightBarClose = document.querySelector('.right-bar-close');
    const profileBtn = document.querySelector('.profile-btn-box button');
    
    // Profile button click handler
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if button has data-bs-toggle="dropdown" (dropdown mode)
            if (!profileBtn.hasAttribute('data-bs-toggle')) {
                // Sidebar mode - toggle sidebar
                const isActive = profileRightSidebar?.classList.contains('active');
                if (isActive) {
                    profileRightSidebar?.classList.remove('active');
                    document.body.classList.remove('overflow-hidden');
                } else {
                    profileRightSidebar?.classList.add('active');
                    document.body.classList.add('overflow-hidden');
                }
            }
            // If has data-bs-toggle, Bootstrap will handle dropdown automatically
        });
    }
    
    // Toggle between sidebar and dropdown
    if (seeAsSidebarCheckbox) {
        seeAsSidebarCheckbox.addEventListener('change', function() {
            if (this.checked) {
                profileBtn?.setAttribute('id', 'profileDropdown');
                profileBtn?.removeAttribute('data-bs-toggle');
                profileRightSidebar?.classList.add('active');
                document.body.classList.add('overflow-hidden');
                this.checked = false;
            }
        });
    }
    
    if (seeAsDropdownCheckbox) {
        seeAsDropdownCheckbox.addEventListener('change', function() {
            if (this.checked) {
                profileBtn?.removeAttribute('id');
                profileBtn?.setAttribute('data-bs-toggle', 'dropdown');
                profileRightSidebar?.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
                this.checked = false;
            }
        });
    }
    
    // Close sidebar
    if (rightBarClose) {
        rightBarClose.addEventListener('click', () => {
            profileRightSidebar?.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    }
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.profile-right-sidebar') && 
            !e.target.closest('.profile-btn-box')) {
            profileRightSidebar?.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        }
    });
    
    // Prevent closing when clicking inside sidebar
    profileRightSidebar?.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

const initHeaderCollapse = () => {
    const collapseBtn = document.querySelector('.header-collapse-group-btn');
    const header = document.querySelector('.header');
    const collapseGroup = document.querySelector('.header-collapse-group');
    
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            header?.classList.toggle('expanded-in-mobile');
            if (collapseGroup) {
                collapseGroup.style.display = 
                    collapseGroup.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
};
</script>

<template>
    <!-- preloader start -->
    <div class="preloader d-none">
        <div class="loader">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    <!-- preloader end -->

    <!-- header start -->
    <div class="header">
        <div class="row g-0 align-items-center">
            <div class="col-xxl-6 col-xl-5 col-4 d-flex align-items-center gap-20">
                <div class="main-logo d-lg-block d-none">
                    <div class="logo-big">
                        <RouterLink to="/dashboard">
                            <LogoWhite />
                        </RouterLink>
                    </div>
                    <div class="logo-small">
                        <RouterLink to="/dashboard">
                            <LogoWhite />
                        </RouterLink>
                    </div>
                </div>
                <div class="nav-close-btn">
                    <button id="navClose"><i class="fa-light fa-bars-sort"></i></button>
                </div>
            </div>
            <div class="col-4 d-lg-none">
                <div class="mobile-logo">
                    <RouterLink to="/dashboard">
                        <LogoWhite />
                    </RouterLink>
                </div>
            </div>
            <div class="col-xxl-6 col-xl-7 col-lg-8 col-4">
                <div class="header-right-btns d-flex justify-content-end align-items-center">
                    <div class="header-collapse-group">
                        <div class="header-right-btns d-flex justify-content-end align-items-center p-0">
                            <div class="header-right-btns d-flex justify-content-end align-items-center p-0">
                                <div class="header-btn-box">
                                    <div class="dropdown">
                                        <button class="header-btn" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                            <i class="fa-light fa-calculator"></i>
                                        </button>
                                        <ul class="dropdown-menu calculator-dropdown">
                                            <div class="dgb-calc-box">
                                                <div>
                                                    <input type="text" id="dgbCalcResult" placeholder="0" autocomplete="off" readonly>
                                                </div>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td class="bg-danger">C</td>
                                                            <td class="bg-secondary">CE</td>
                                                            <td class="dgb-calc-oprator bg-primary">/</td>
                                                            <td class="dgb-calc-oprator bg-primary">*</td>
                                                        </tr>
                                                        <tr>
                                                            <td>7</td>
                                                            <td>8</td>
                                                            <td>9</td>
                                                            <td class="dgb-calc-oprator bg-primary">-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>4</td>
                                                            <td>5</td>
                                                            <td>6</td>
                                                            <td class="dgb-calc-oprator bg-primary">+</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>2</td>
                                                            <td>3</td>
                                                            <td rowspan="2" class="dgb-calc-sum bg-primary">=</td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">0</td>
                                                            <td>.</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <button class="header-btn fullscreen-btn" id="btnFullscreen"><i class="fa-light fa-expand"></i></button>
                            </div>
                        </div>
                    </div>
                    <button class="header-btn header-collapse-group-btn d-lg-none"><i class="fa-light fa-ellipsis-vertical"></i></button>
                    <button class="header-btn theme-settings-btn d-lg-none"><i class="fa-light fa-gear"></i></button>
                    <div class="header-btn-box profile-btn-box">
                        <button class="" data-bs-toggle="dropdown" aria-expanded="false" style="border: 0px; background: transparent;">
                            <div class="custom-avatar-container" style="width: 40px; height: 40px;">
                                <DefaultAvatar />
                            </div>
                        </button>
                        <ul class="dropdown-menu profile-dropdown-menu">
                            <li>
                                <div class="dropdown-txt text-center">
                                    <p v-if="!user || loading">Loading...</p>
                                    <p v-else>{{ user.fullname }}</p>
                                </div>
                            </li>
                            <li><RouterLink class="dropdown-item" to="/personal-information"><span class="dropdown-icon"><i class="fa-regular fa-circle-user"></i></span> Profile</RouterLink></li>
                            <li><RouterLink class="dropdown-item" to="/help-center"><span class="dropdown-icon"><i class="fa-regular fa-circle-question"></i></span> Help</RouterLink></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><RouterLink class="dropdown-item" to="/logout"><span class="dropdown-icon"><i class="fa-regular fa-arrow-right-from-bracket"></i></span> Logout</RouterLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- header end -->
</template>