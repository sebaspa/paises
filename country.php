<?php require('layouts/header.php') ?>

<div class="container" id="cont-country">
    <div class="row">
        <div class="col-12">
            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col-12 col-md-6 col-lg-8 p-4 d-flex flex-column position-static order-last order-lg-first">
                    <strong class="d-inline-block mb-2 text-success" id="txtRegion">---</strong>
                    <h3 class="mb-0" id="txtCountryName">---</h3>
                    <div class="mb-1 text-muted" id="txtCapital">---</div>
                    <p class="card-text mb-auto"><b>Población: </b><span id="txtPopulation"></span></p>
                    <p class="card-text mb-auto"><b>Moneda: </b><span id="txtCurrency"></span></p>
                    <p class="card-text mb-auto"><b>Idiomas: </b><span id="listLanguages"></span></p>
                    <p class="card-text mb-auto"><b>Países fronterizos: </b><span id="listBorders"></span></p>
                </div>
                <div class="col-12 col-md-6 col-lg-4 order-first order-lg-last">
                    <img src="" id="countryFlag" width="100%" height="236" alt="">
                </div>
            </div>
        </div>
    </div>
</div><!-- .container -->

<?php require('layouts/footer.php') ?>