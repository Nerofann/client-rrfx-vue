<script setup>
import { onMounted, ref } from 'vue';
import EconomicCalendarbyTradingView from '@/components/utils/EconomicCalendarbyTradingView.vue';
import News from '@/views/dashboard/News.vue';

</script>
<template>
    <div class="row mb-25">
        <div class="col-lg-3 col-6 col-xs-12">
            <div class="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg h-100">
                <div class="left h-100 d-flex flex-column">
                    <p class="d-flex justify-content-between mb-2">Total Deposit</p>
                    <div class="d-flex flex-column">
                        <small class="fw-normal mb-0 dp-idr">Loading...</small>
                        <small class="fw-normal dp-usd">Loading...</small>
                    </div>
                    <p class="text-muted mt-auto"><a href="deposit"><small>Deposit History</small></a></p>
                </div>
                <div class="right">
                    <a href="deposit">
                        <div class="part-icon text-light rounded">
                            <span><i class="fa-light fa-arrow-right-to-bracket"></i></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-6 col-xs-12">
            <div class="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg h-100">
                <div class="left h-100 d-flex flex-column">
                    <p class="d-flex justify-content-between mb-2">Total Withdrawal</p>
                    <div class="d-flex flex-column mb-2">
                        <small class="fw-normal mb-0 wd-idr">Loading...</small>
                        <small class="fw-normal wd-usd">Loading...</small>
                    </div>
                    <p class="text-muted mt-auto"><a href="withdrawal"><small>Withdrawal History</small></a></p>
                </div>
                <div class="right">
                    <a href="withdrawal">
                        <div class="part-icon text-light rounded">
                            <span><i class="fa-light fa-arrow-right-from-bracket"></i></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-6 col-xs-12">
            <div class="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg h-100">
                <div class="left h-100 d-flex flex-column">
                    <p class="d-flex justify-content-between mb-2">Total Account</p>
                    <h3 class="fw-normal account">Loading...</h3>
                    <p class="text-muted mt-auto"><a href="account"><small>View Account</small></a></p>
                </div>
                <div class="right">
                    <a href="/account">
                        <div class="part-icon text-light rounded">
                            <span><i class="fa-light fa-user-tie"></i></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-6 col-xs-12">
            <div class="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg h-100">
                <div class="left h-100 d-flex flex-column">
                    <p class="d-flex justify-content-between mb-2">MetaTrader 5</p>
                    <h3 class="fw-normal"><small>Windows | Android | iOS</small></h3>
                    <p class="text-muted mt-auto"><a href="#" data-bs-toggle="modal" data-bs-target="#mt5DownloadModal"><small>Download Now</small></a></p>
                </div>
                <div class="right">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#mt5DownloadModal">
                        <div class="part-icon text-light rounded">
                            <span><i class="fa-light fa-chart-line"></i></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-25">
        <div class="col-md-8">
            <div class="panel h-100 chart-panel-1">
                <div class="panel-header">
                    <h5>Net In Out</h5>
                    <div class="btn-box" id="rangeFilters">
                        <button type="button" class="btn btn-sm btn-primary" data-range="7d">Last 1 Minggu</button>
                        <button type="button" class="btn btn-sm btn-outline-primary" data-range="1m">Last 1 Bulan</button>
                        <button type="button" class="btn btn-sm btn-outline-primary" data-range="1y">Last 1 Tahun</button>
                    </div>
                </div>
                <div class="panel-body">
                    <div id="saleAnalytics" class="chart-dark"></div>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="panel h-100">
                <div class="card">
                    <EconomicCalendarbyTradingView />
                </div>
            </div>
        </div>
    </div>

    <News />
</template>