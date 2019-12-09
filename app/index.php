<?php header ('Content-type: text/html; charset=UTF-8'); ?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="pt-br"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta http-equiv="content-language" content="pt-br" />
        <meta http-equiv="cache-control" content="no-cache" />

        <title>Buscar CEP com VUE Js</title>

        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <!-- Styles -->
        <link rel="stylesheet" href="assets/css/style.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.2.0/css/bulma.min.css" type="text/css" media="screen" />

        <!-- Scripts -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.3/axios.min.js"></script>
        <script src="assets/js/all.combined.js"></script>
    </head>

    <body>
        <main id="app" class="center-v-h">
            <section class="w-40">
                <form class="center-v-h">
                    <fieldset>
                        <input type="text" class="form-control" id="inputCep" v-model="cep" v-on:keyup="buscar" placeholder="Digite seu CEP" />
                        <input type="submit" value="Buscar CEP" class="btn btn-full-gray-dark" v-on:click="validar" />
                    </fieldset>
                </form>

                <span class="alert-danger" v-show="naoLocalizado">
                    <strong>* CEP não encontrado</strong>
                </span>

                <span class="alert-danger" v-show="invalido">
                    <strong>* Digite um CEP válido</strong>
                </span>

                <div v-if="cep" class="content-address">
                    <address>
                        <strong>CEP:</strong> {{ endereco.cep }} <br>
                        <strong>Estado:</strong> {{ endereco.uf }} <br>
                        <strong>Cidade:</strong> {{ endereco.localidade }} <br>
                        <strong>Logradouro:</strong> {{ endereco.logradouro }} <br>
                    </address>
                </div>
            </section>
        </main>
    </body>


    <script>
        var app = new Vue({
          el: '#app',
          data: {
            cep: null,
            endereco: {},
            naoLocalizado: false,
            invalido: false,
          },
          mounted: function () {
            $('#inputCep').mask('00000-000');
          },
          methods: {
            buscar: function(){
              var self = this;

              self.naoLocalizado = false;

                if(/^[0-9]{5}-[0-9]{3}$/.test(this.cep)){
                    $.getJSON("https://viacep.com.br/ws/" + this.cep + "/json/", function(endereco){
                      if(endereco.erro){
                        self.endereco = {};
                        $('.content-address').hide();
                        self.naoLocalizado = true;
                        $('#inputCep').addClass('error');
                        return;
                      }
                      self.endereco = endereco;
                      self.invalido = false;
                      $('#inputCep').removeClass('error');
                      console.log(endereco);
                    });
                }

                // hide or show container address depending the length
                if(this.cep.length < 9) {
                    $('.content-address').hide();
                } else {
                    $('.content-address').show();
                }
            },

            validar: function(e){
                if(this.cep.length < 9) {
                    this.invalido = true;
                    $('#inputCep').addClass('error');
                }
                e.preventDefault();
            }
          }
        })
    </script>
</html>