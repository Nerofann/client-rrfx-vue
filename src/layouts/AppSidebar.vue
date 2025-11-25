<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
    nextTick(() => {
        initSidebar();
        initOverlayScrollbars();
        setActiveLink();
        scrollToActiveLink();
    });
});

watch(() => route.path, () => {
    nextTick(() => {
        setActiveLink();
    });
});

const initSidebar = () => {
    // Sidebar dropdown functionality
    const sidebarLinkGroups = document.querySelectorAll('.sidebar-link-group-title');
    sidebarLinkGroups.forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const mainSidebar = document.querySelector('.main-sidebar');
            if (!mainSidebar?.classList.contains('horizontal-menu')) {
                const linkGroup = this.nextElementSibling;
                if (linkGroup?.classList.contains('sidebar-link-group')) {
                    const isVisible = linkGroup.style.display !== 'none';
                    linkGroup.style.display = isVisible ? 'none' : 'block';
                    this.classList.toggle('collapsed');
                }
            }
        });
    });

    // Has-sub dropdown functionality
    const hasSubs = document.querySelectorAll('.has-sub');
    hasSubs.forEach(sub => {
        sub.addEventListener('click', function(e) {
            e.preventDefault();
            const mainSidebar = document.querySelector('.main-sidebar');
            const dropdownMenu = this.nextElementSibling;
            
            if (!mainSidebar?.classList.contains('horizontal-menu') && 
                !mainSidebar?.classList.contains('two-column-menu')) {
                
                // Toggle current dropdown
                this.classList.toggle('show');
                if (dropdownMenu?.classList.contains('sidebar-dropdown-menu')) {
                    const isVisible = dropdownMenu.style.display !== 'none';
                    dropdownMenu.style.display = isVisible ? 'none' : 'block';
                    
                    // Close other dropdowns in the same level
                    const parent = this.closest('.sidebar-item, .sidebar-dropdown-item');
                    if (parent) {
                        const siblings = Array.from(parent.parentElement.children).filter(el => el !== parent);
                        siblings.forEach(sibling => {
                            const siblingLink = sibling.querySelector('.sidebar-link.has-sub');
                            const siblingDropdown = sibling.querySelector('.sidebar-dropdown-menu');
                            if (siblingLink) siblingLink.classList.remove('show');
                            if (siblingDropdown) siblingDropdown.style.display = 'none';
                        });
                    }
                }
            }
        });
    });
};

const initOverlayScrollbars = () => {
    const scrollable = document.querySelector('.sidebar-menu.scrollable');
    if (scrollable && typeof OverlayScrollbars !== 'undefined') {
        OverlayScrollbars(scrollable, {});
    }
};

const setActiveLink = () => {
    // Remove all active classes
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    // Set active link based on current route
    const currentPath = window.location.pathname;
    document.querySelectorAll('.sidebar-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            
            // Open parent dropdowns
            let parent = link.closest('.sidebar-dropdown-menu');
            while (parent) {
                parent.style.display = 'block';
                const parentLink = parent.previousElementSibling;
                if (parentLink?.classList.contains('has-sub')) {
                    parentLink.classList.add('show');
                }
                parent = parent.closest('.sidebar-item')?.querySelector('.sidebar-dropdown-menu');
            }
            
            // Open parent link group
            const linkGroup = link.closest('.sidebar-link-group');
            if (linkGroup) {
                linkGroup.style.display = 'block';
                const groupTitle = linkGroup.previousElementSibling;
                if (groupTitle?.classList.contains('sidebar-link-group-title')) {
                    groupTitle.classList.add('show');
                }
            }
        }
    });
};

const scrollToActiveLink = () => {
    const activeLink = document.querySelector('.sidebar-link.active');
    if (activeLink) {
        const sidebar = document.querySelector('.main-sidebar');
        const scrollContainer = sidebar?.querySelector('.sidebar-menu .os-viewport') || 
                               sidebar?.querySelector('.sidebar-menu');
        
        if (scrollContainer) {
            setTimeout(() => {
                const linkOffset = activeLink.offsetTop;
                const containerHeight = scrollContainer.clientHeight;
                const scrollPosition = linkOffset - (containerHeight / 2);
                scrollContainer.scrollTop = Math.max(0, scrollPosition);
            }, 100);
        }
    }
};
</script>

<template>
    <!-- main sidebar start -->
    <div class="main-sidebar">
        <div class="main-menu">
            <ul class="sidebar-menu scrollable">
                <li class="sidebar-item">
                    <ul class="sidebar-link-group" style="display: block;">
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/dashboard" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-home"></i></span> 
                                <span class="sidebar-txt">Dashboard</span>
                            </RouterLink>
                        </li>
                    </ul>
                </li>

                <li class="sidebar-item">
                    <a role="button" class="sidebar-link-group-title">Verification of personal data</a>
                    <ul class="sidebar-link-group">
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/verification/step1" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-shield-check"></i></span> 
                                <span class="sidebar-txt">Step 1</span>
                            </RouterLink>
                        </li>
                    </ul>
                </li>

                <li class="sidebar-item">
                    <a role="button" class="sidebar-link-group-title">Trade</a>
                    <ul class="sidebar-link-group">
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/web-trade" class="sidebar-link">
                                <span class="nav-icon">
                                    <i class="fa-light fa-chart-column"></i>
                                </span>
                                <span class="blink-text sidebar-txt">Web Trade </span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/account" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-user-tie"></i></span> 
                                <span class="sidebar-txt">Account</span>
                            </RouterLink>
                        </li>
                    </ul>
                </li>
                <li class="sidebar-item">
                    <a role="button" class="sidebar-link-group-title">Profile</a>
                    <ul class="sidebar-link-group">
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/personal-information" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-user"></i></span> 
                                <span class="sidebar-txt">Personal Information</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/security" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-shield"></i></span> 
                                <span class="sidebar-txt">Security</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/bank" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-bank"></i></span> 
                                <span class="sidebar-txt">Bank</span>
                            </RouterLink>
                        </li>
                    </ul>
                </li>
                    
                <li class="sidebar-item">
                    <a role="button" class="sidebar-link-group-title">Finance</a>
                    <ul class="sidebar-link-group">
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/wallet" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-wallet"></i></span> 
                                <span class="sidebar-txt">Wallet</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/deposit" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-arrow-right-to-bracket"></i></span> 
                                <span class="sidebar-txt">Deposit</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/withdrawal" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-arrow-right-from-bracket"></i></span> 
                                <span class="sidebar-txt">Withdrawal</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/internal-transfer" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-arrow-right-arrow-left"></i></span> 
                                <span class="sidebar-txt">Internal Transfer</span>
                            </RouterLink>
                        </li>
                    </ul>
                </li>

                <li class="sidebar-item">
                    <a role="button" class="sidebar-link-group-title">IB</a>
                    <ul class="sidebar-link-group">
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/ib/become" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-users"></i></span> 
                                <span class="sidebar-txt">Become IB</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/ib/tree" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-network-wired"></i></span> 
                                <span class="sidebar-txt">Treeview</span>
                            </RouterLink>
                        </li>
                    </ul>
                </li>

                <li class="sidebar-item">
                    <a role="button" class="sidebar-link-group-title">Sales</a>
                    <ul class="sidebar-link-group">
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/sales/commission/setting" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-gear"></i></span> 
                                <span class="sidebar-txt">Commission Setting</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/sales/dorman" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-user-lock"></i></span> 
                                <span class="sidebar-txt">Dorman</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/sales/keep" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-user-circle"></i></span> 
                                <span class="sidebar-txt">Your Retention</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar-dropdown-item">
                            <RouterLink to="/sales/wallet" class="sidebar-link">
                                <span class="nav-icon"><i class="fa-light fa-wallet"></i></span> 
                                <span class="sidebar-txt">Wallet</span>
                            </RouterLink>
                        </li>
                    </ul>
                </li>

                <li class="help-center">
                    <h3>Help Center</h3>
                    <RouterLink to="/help-center" class="btn btn-sm btn-light">Go to Help Center</RouterLink>
                </li>

                <li class="help-center" style="margin-top: 20px;">
                    <p>Your Download is Just One Click Away!</p>
                    <RouterLink to="/downloads" class="btn btn-sm btn-light">Download</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .blink-text {
        animation: blinker 1s linear infinite; /* Terapkan animasi */
    }

    @keyframes blinker {
        50% {
            opacity: 0; /* Sembunyikan teks pada 50% durasi */
        }
    }
</style>