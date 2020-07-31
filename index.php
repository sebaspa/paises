<?php require('layouts/header.php') ?>
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6">
            <div class="form-group">
                <label for="search">Buscar</label>
                <input type="text" class="form-control" id="search">
                <small>Buscar país por nombre.</small>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="form-group">
                <label for="region">Filtro por continente</label>
                <select name="region" id="region" class="form-control" for="region">
                    <option value="">Seleccione el continente</option>
                </select>
                <small>Filtar por continente.</small>
            </div>
        </div>
    </div>
    <div class="row mb-4">
        <div class="col-12">
            <h1>Listado de Países</h1>
        </div>
    </div>
    <div id="cont-alert"></div>
    <div id="allCountries" class="row">
    </div><!-- .row -->
</div><!-- .container -->
<?php require('layouts/footer.php') ?>