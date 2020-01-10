let qtosNodMd = 0;
let qtosNodMe = 0;
let qtasCarAss = 0;
let qtasCasEsp = 0;
let qtasCalcMd = 0;

let qtasCarAssMe = 0;
let qtasCasEspMe = 0;
let qtasCalcMe = 0;

// var toolbarOptions = [
//     ['bold', 'italic'],
//     [{ 'size': ['small', false, 'large', 'huge'] }],
//     [{ 'color': [] }, { 'background': [] }]
//   ]

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ]; 
  var editor = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
      
    },
    theme: 'snow'
  });



// quill js com múltiplas opcões
// var editor = new Quill('#editor-container', {
//     modules: {
//       syntax: true,
//       toolbar: '#toolbar-container'
//     },
//     placeholder: 'Digite aqui seu laudo...',
//     theme: 'snow'
//   });


function copiar_laudo(){
    //copiar para a área de trabalho  
    // document.getElementById("editor").select();s
    // document.execCommand("copy");


}

function apagar_laudo(){
   
    document.getElementById("laudo").value = '';

    var confirma = confirm("Tem certeza que deseja apagar o laudo?");
    if(confirma === true){
        editor.root.innerHTML = "";

    }
    
}

function criar_laudo(){

    //MD OK

// editor.insertText(0, 'Hello', 'bold', true);
var laudo = `<b>ULTRASSONOGRAFIA MAMÁRIA</b>
<p><b>TÉCNICA:</b> Exame realizado com transdutor linear de alta frequência.</p>
<p><b>INDICAÇÃO CLÍNICA:</b> {indi}<p>
<p><b>LAUDO:</b></p>
<p>{composicao}
{ini_md}
{mama_dir}
{fim_md}
{ini_me}
{mama_esq}
{fim_me}
{acha_extras}</p>
<p><b>IMPRESSÃO DIAGNÓSTICA:</b>
{diag}</p>
<b>BI-RADS®: {birads}</b>
<p><b>RECOMENDAÇÕES:</b>
{recomedacoes}</p>
`

    // editor.insertText(0,'ULTRASSONOGRAFIA MAMÁRIAxxx','true')

    // var postContent = "<h2>My short post</h2><p>This is a <strong>really, really</strong> short post.</p>";

    // editor.setText(postContent, "api");
    // editor.root.innerHTML = postContent;

    if(document.getElementById("laudos_rapidos").checked){
        let laudos_rapidos = document.getElementById("laudos_rapidos_select").selectedIndex;
        if(laudos_rapidos === 0){
            laudo = laudo.replace("{birads}","1")            
            laudo = laudo.replace("{diag}","- Ausências de alterações ecográficas em ambas as mamas.")
            laudo = laudo.replace("{recomedacoes}","- Prosseguir com seguimento habitual.\n")

        } 
        if(laudos_rapidos === 1){
            laudo = laudo.replace("{birads}","2")
            laudo = laudo.replace("{acha_extras}","- Próteses mamárias íntegras bilaterais.")
            laudo = laudo.replace("{diag}","- Próteses mamárias íntegras bilaterais.")
            laudo = laudo.replace("{recomedacoes}","- Prosseguir com seguimento habitual.\n")

        }

        //eliminar linhas em branco desnecessárias
        var laudo_final = laudo.replace(/^\s*$[\n\r]{1,}/gm, '');

        //como copiar o texto do Quill para área de trabalho ao gerar o laudo
        var editor_id = document.querySelector(".ql-editor")
        editor_id.setAttribute("id","laudo_texto") 

        //como adicionar texto no quill já formatado. ver modelo lá em cima
        editor.root.innerHTML = laudo_final;

        document.getElementById("GerarLaudo_rap").setAttribute("data-clipboard-target","#laudo_texto")
        var clipboard = new ClipboardJS(".GeraLaudo_rap");

    }

    let indicacao = document.getElementById("indicacao").value;
    if(indicacao == null || indicacao == ""){
        laudo = laudo.replace("{indi}","Avaliação clínica.");
    }else{
        laudo = laudo.replace("{indi}",indicacao);
    }
    let composicao = document.getElementById("composicao_mama").selectedIndex;
    if(composicao === 0){
        laudo = laudo.replace("{composicao}","- Parênquima mamário com composição homogeneamente gordurosa.")
    }
    if(composicao === 1){
        laudo = laudo.replace("{composicao}","- Parênquima mamário com composição predominantemente fibroglandular.")
    }
    if(composicao === 2){
        laudo = laudo.replace("{composicao}","- Parênquima mamário com composição heterogênea.")
    }
    //MAMA DIREITA SEM NÓDULOS
    if (!document.getElementById("nodulos_md").checked) {
        laudo = laudo.replace("{mama_dir}","- Ausência de imagens nodulares sólidas ou císticas em mama direita.")
    }
    //MAMA ESQUERDA SEM NÓDULOS
    if (!document.getElementById("nodulos_me").checked) {
        laudo = laudo.replace("{mama_esq}","- Ausência de imagens nodulares sólidas ou císticas em mama esquerda.")
    }


    let birads = document.getElementById("birads").selectedIndex;
    if(birads === 0){
        laudo = laudo.replace("{birads}","0")
        laudo = laudo.replace("{recomedacoes}","- Sugere-se complementar estudo com mamografia.\n{recomedacoes}")
    }
    if(birads === 1){
        laudo = laudo.replace("{birads}","1")
        laudo = laudo.replace("{diag}","- Ausências de alterações ecográficas em ambas as mamas.")
        laudo = laudo.replace("{recomedacoes}","- Prosseguir com seguimento habitual.\n{recomedacoes}")
    }
    if(birads === 2){
        laudo = laudo.replace("{birads}","2")
        laudo = laudo.replace("{recomedacoes}","- Achados benigos. Prosseguir com seguimento habitual.\n{recomedacoes}")
    }
    if(birads === 3){
        laudo = laudo.replace("{birads}","3")
        laudo = laudo.replace("{recomedacoes}","- Achados provavelmente benignos. Sugere-se repetir investigação em 6 meses.\n{recomedacoes}")
    }
    if(birads === 4){
        laudo = laudo.replace("{birads}","4")
        laudo = laudo.replace("{recomedacoes}","- Achados suspeitos. Sugere-se considerar biópsia.\n{recomedacoes}")
    }
    if(birads === 5){
        laudo = laudo.replace("{birads}","5")
        laudo = laudo.replace("{recomedacoes}","- Achados altamente suspeitos. Sugere-se considerar biópsia.\n{recomedacoes}")
    }
    if(birads === 6){
        laudo = laudo.replace("{birads}","6")
        // laudo = laudo.replace("{recomedacoes}","- Achados .\n{recomedacoes}")
    }
    
    

    if(document.getElementById("nodulos_md").checked){
        if(qtosNodMd == 1){
            var forma = document.getElementById("nod_md_forma1").options[document.getElementById("nod_md_forma1").selectedIndex].text;
            var margem = document.getElementById("nod_md_margem1").options[document.getElementById("nod_md_margem1").selectedIndex].text;
            var paralela = document.getElementById("nod_md_orientacao1").options[document.getElementById("nod_md_orientacao1").selectedIndex].text;
            var eco = document.getElementById("nod_md_eco1").options[document.getElementById("nod_md_eco1").selectedIndex].text;
            var reforco = document.getElementById("nod_md_posterior1").selectedIndex;
            if(reforco === 0){
                reforco = "sem apresentar elementos acústicos posteriores";
            }
            if(reforco === 1){
                reforco = "apresentando reforço acústico posterior";
            }
            if(reforco === 2){
                reforco = "apresentando sombra acústica posterior";
            }
            if(reforco === 3){
                reforco = "apresentando aspecto acústico posterior misto";
            }

            var medidas = document.getElementById("medida_nod_md1").value.split(" ");
            
            if(medidas == null || medidas == ""){
                 medidas = "ATENÇÃO! NÓDULO SEM MEDIDA";
                 alert("Atenção: Nódulo em mama direita sem medida!")                
            }else{                
                if(medidas.length === 1){
                    medidas = medidas[0].toString() + " cm";
                }
                if(medidas.length === 2){
                    medidas =medidas[0].toString() + " x " + medidas[1].toString() +" cm";
                }
                if(medidas.length === 3){
                    var nod1 = parseFloat(medidas[0]);
                    var nod2 = parseFloat(medidas[1]);
                    var nod3 = parseFloat(medidas[2]);
                    var nodVol = parseFloat(nod1*nod2*nod3*0.523).toFixed(1);
                    medidas =  nod1.toString() + " x " + nod2.toString() + " x " + nod3.toString() + " cm, com volume aproximado de "+nodVol.toString()+" cm³";
                    // medidas = medidas[0].toString() + " x " + medidas[1].toString() + " cm, distando "+medidas[2].toString()+" cm da pele"
    
                }

            }

            var disPeleMamilo = document.getElementById("nod_md_distMaPe1").value
            if(disPeleMamilo.length > 0){
                disPeleMamilo = document.getElementById("nod_md_distMaPe1").value.split(" ");
                if(disPeleMamilo.length === 1){
                    disPeleMamilo = " distando "+disPeleMamilo[0]+" cm do mamilo, "
                }
                if(disPeleMamilo.length === 2){
                    disPeleMamilo = " distando "+disPeleMamilo[0]+" cm do mamilo e "+disPeleMamilo[1]+" cm da pele, "
                }

            }
            if(disPeleMamilo.length === 0){
                
                disPeleMamilo = "";
                disPeleMamilo.trim();

            }

            // if(medidas.length === 4){
            //     var nod1 = parseFloat(medidas[0]);
            //     var nod2 = parseFloat(medidas[1]);
            //     var nod3 = parseFloat(medidas[2]);
            //     var nodVol = parseFloat(nod1*nod2*nod3*0.523).toFixed(1);
            //     medidas = nod1.toString() + " x " + nod2.toString() + " x " + nod3.toString() + " cm, com volume aproximado de "+nodVol.toString()+" cm³, distando "+medidas[3].toString()+" cm da pele"

            // }
            var localizacao = document.getElementById("nod_md_localizacao1").selectedIndex;
            if(localizacao === 12){
                localizacao = " em localização retroareolar";
            }else if(localizacao === 13){
                localizacao = " em localização periareolar";
            }else{
                localizacao = " localizado às "+document.getElementById("nod_md_localizacao1").options[document.getElementById("nod_md_localizacao1").selectedIndex].text;
                // console.log(localizacao.Option.value)
            }
            var tipo = document.getElementById("nod_md_tipo1").options[document.getElementById("nod_md_tipo1").selectedIndex].text;
            if(tipo === "Ilhota de gordura"){
                tipo = 'nódulo sólido ou ilhota de gordura'
            }


            if(document.getElementById("nod_md_marcarPAAF1").checked){                
                laudo = laudo.replace("{recomedacoes}","- Sugere-se realizar PAAF no cisto em mama direita acima descrito.\n{recomedacoes}");

            }
            if(document.getElementById("nod_md_marcarCore1").checked){
                laudo = laudo.replace("{recomedacoes}","- Sugere-se realizar Core Biopsy no nódulo em mama direita acima descrito.\n{recomedacoes}");

            }



            
            laudo = laudo.replace("{mama_dir}","- Parênquima mamário direito apresentando a seguinte imagem nodular:\n{nod_md}");
            laudo = laudo.replace("{nod_md}","Imagem nodular "+forma+", "+margem+", de orientação "+paralela+" à pele, de conteúdo "+eco+", "+reforco+", medindo "+medidas+","+disPeleMamilo+""+localizacao+", sugestiva de "+tipo+".\n{nod_md}");
            
        }

        if(qtosNodMd > 1){
            for(i=1;i<=qtosNodMd;i++){
                var forma = document.getElementById("nod_md_forma"+i).options[document.getElementById("nod_md_forma"+i).selectedIndex].text;
                var margem = document.getElementById("nod_md_margem"+i).options[document.getElementById("nod_md_margem"+i).selectedIndex].text;
                var paralela = document.getElementById("nod_md_orientacao"+i).options[document.getElementById("nod_md_orientacao"+i).selectedIndex].text;
                var eco = document.getElementById("nod_md_eco"+i).options[document.getElementById("nod_md_eco"+i).selectedIndex].text;
                var reforco = document.getElementById("nod_md_posterior"+i).selectedIndex;
                if(reforco === 0){
                    reforco = "sem apresentar elementos acústicos posteriores";
                }
                if(reforco === 1){
                    reforco = "apresentando reforço acústico posterior";
                }
                if(reforco === 2){
                    reforco = "apresentando sombra acústica posterior";
                }
                if(reforco === 3){
                    reforco = "apresentando aspecto acústico posterior misto";
                }

                var medidas = document.getElementById("medida_nod_md"+i).value.split(" ");
                if(medidas == null || medidas == ""){
                    medidas = "ATENÇÃO! NÓDULO SEM MEDIDA";
                    alert("Atenção: Nódulo N"+i+" em mama direita sem medida!")                
               }else{
                if(medidas.length === 1){
                    medidas = medidas[0].toString() + " cm";
                }
                if(medidas.length === 2){
                    medidas = medidas[0].toString() + " x " + medidas[1].toString() +" cm";
                }
                if(medidas.length === 3){
                    var nod1 = parseFloat(medidas[0]);
                    var nod2 = parseFloat(medidas[1]);
                    var nod3 = parseFloat(medidas[2]);
                    var nodVol = parseFloat(nod1*nod2*nod3*0.523).toFixed(1);
                    medidas =  nod1.toString() + " x " + nod2.toString() + " x " + nod3.toString() + " cm, com volume aproximado de "+nodVol.toString()+" cm³";
    
                }

               }

               var disPeleMamilo = document.getElementById("nod_md_distMaPe"+i).value
               if(disPeleMamilo.length > 0){
                   disPeleMamilo = document.getElementById("nod_md_distMaPe"+i).value.split(" ");
                   if(disPeleMamilo.length === 1){
                       disPeleMamilo = " distando "+disPeleMamilo[0]+" cm do mamilo, "
                   }
                   if(disPeleMamilo.length === 2){
                       disPeleMamilo = " distando "+disPeleMamilo[0]+" cm do mamilo e "+disPeleMamilo[1]+" cm da pele, "
                   }
   
               }
               if(disPeleMamilo.length === 0){
                   
                   disPeleMamilo = "";
                   disPeleMamilo.trim();
   
               }




                var localizacao = document.getElementById("nod_md_localizacao"+i).selectedIndex;
                if(localizacao === 12){
                    localizacao = " em localização retroareolar";
                }else if(localizacao === 13){
                    localizacao = " em localização periareolar";
                }else{
                    localizacao = " localizado às "+document.getElementById("nod_md_localizacao"+i).options[document.getElementById("nod_md_localizacao"+i).selectedIndex].text;
                    // console.log(localizacao.Option.value)
                }
                var tipo = document.getElementById("nod_md_tipo"+i).options[document.getElementById("nod_md_tipo"+i).selectedIndex].text;
                if(tipo === "Ilhota de gordura"){
                    tipo = 'nódulo sólido ou ilhota de gordura'
                }

                if(document.getElementById("nod_md_marcarPAAF"+i).checked){                
                    laudo = laudo.replace("{recomedacoes}","- Sugere-se realizar PAAF em N"+i+" em mama direita acima descrito.\n{recomedacoes}");
    
                }
                if(document.getElementById("nod_md_marcarCore"+i).checked){
                    laudo = laudo.replace("{recomedacoes}","- Sugere-se realizar Core Biopsy em N"+i+" em mama direita acima descrito.\n{recomedacoes}");
    
                }
    
                
                laudo = laudo.replace("{mama_dir}","- Parênquima mamário direito apresentando as seguintes imagens nodulares:\n{nod_md}");
                laudo = laudo.replace("{nod_md}","N"+i+": Imagem nodular "+forma+", "+margem+", de orientação "+paralela+" à pele, de conteúdo "+eco+", "+reforco+", medindo "+medidas+","+disPeleMamilo+""+localizacao+", sugestiva de "+tipo+".\n{nod_md}");

            }
        }
    }

    if(document.getElementById("calcificacoes_md").checked){
        for (i=1;i<=qtasCalcMd;i++){
            var locCalMd = document.getElementById("calc_md"+i).options[document.getElementById("calc_md"+i).selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Presença de focos de calcificação em "+locCalMd+" da mama direita.\n{acha_extras}")
        }
        if (qtasCalcMd===1){
            laudo = laudo.replace("{diag}","- Presença de focos de calcificação em "+locCalMd+" da mama direita.\n{diag}")
        }
        if (qtasCalcMd>1){
            laudo = laudo.replace("{diag}","- Presença de focos de calcificação em mama direita acima descritos.\n{diag}")
        }


    }

    //Funciona
    if(document.getElementById("carAss_md").checked){
        var carAssMdX = document.getElementById("carAss_md_select").selectedIndex;

        
        var carAssMd_xx = document.querySelectorAll(".dist_arq_md")

        for (i=0;i<carAssMd_xx.length;i++){
            var carAssMd_xa = carAssMd_xx[i].options[carAssMd_xx[i].selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Sinais de distorção arquitetural em "+carAssMd_xa+" da mama direita.\n{acha_extras}")
        }
        if(carAssMd_xx.length === 1){
            laudo = laudo.replace("{diag}","- Sinais de distorção arquitetural em "+carAssMd_xa+" da mama direita.\n{diag}")
        }
        if(carAssMd_xx.length > 1){
            laudo = laudo.replace("{diag}","- Áreas de distorção arquitetural em mama direita acima descritas.\n{diag}")
        }

        var carAssMd_EDSM = document.querySelectorAll(".edsm_md")            
        for (i=0;i<carAssMd_EDSM.length;i++){
            laudo = laudo.replace("{acha_extras}","- Ectasia ductal sem material em seu interior.\n{acha_extras}")
        }
        if(carAssMd_EDSM.length === 1){
            laudo = laudo.replace("{diag}","- Ectasia ductal na mama direita sem material em seu interior.\n{diag}")
        }

        var medMatDuc = document.querySelectorAll(".medida_MedectDuctMat_md");
        for (i=0;i<medMatDuc.length;i++){
            
            if(medMatDuc[i].value.length === 0){
                laudo = laudo.replace("{acha_extras}","- Ectasia ductal apresentando material em seu interior.\n{acha_extras}")

            }
            if(medMatDuc[i].value.length > 0){
                var edcm_med = medMatDuc[i].value;
                laudo = laudo.replace("{acha_extras}","- Ectasia ductal apresentando material em seu interior, medindo "+edcm_med+" cm.\n{acha_extras}")
            }
            
        }
        if(medMatDuc.length === 1){
            laudo = laudo.replace("{diag}","- Ectasia ductal na mama direita com material em seu interior, acima descrita.\n{diag}")
            laudo = laudo.replace("{recomedacoes}","- Sugere-se prosseguir investigação com Core Biopsy de material no interior de ductos em mama direita.\n{diag}")
        }




        var carAssMd_EspPeleX = document.querySelectorAll(".espessamento_pele_md");
        for (let index = 0; index < carAssMd_EspPeleX.length; index++) {
            const carAssMd_EspPeleX_select = carAssMd_EspPeleX[index].options[carAssMd_EspPeleX[index].selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Sinais de espessamento da pele em "+carAssMd_EspPeleX_select+" da mama direita.\n{acha_extras}");
            
        }
        if(carAssMd_EspPeleX.length >0 ){
            laudo = laudo.replace("{diag}","- Sinais de espessamento de pele em mama direita, acima descrita.\n{diag}")
            
        }
                
        let carAssMd_RetPele = document.querySelectorAll(".retracao_pele_md");
        for (let index2 = 0; index2 < carAssMd_RetPele.length; index2++) {
            const carAssMd_RetPele_select = carAssMd_RetPele[index2].options[carAssMd_RetPele[index2].selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Sinais de retração da pele em "+carAssMd_RetPele_select+" da mama direita.\n{acha_extras}")
            
        }
        if(carAssMd_RetPele.length >0 ){
            laudo = laudo.replace("{diag}","- Sinais de retração de pele em mama direita, acima descrita.\n{diag}")
            
        }

        
   
    }

    
    if(document.getElementById("casEsp_md").checked){
        let casEspMd_MC = document.querySelectorAll(".casEsp_MicroCisAgr_md")
        for (i=0;i<casEspMd_MC.length;i++){
            let casEspMd_MC_a = casEspMd_MC[i].options[casEspMd_MC[i].selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Microcistos agrupados em "+casEspMd_MC_a+" da mama direita.\n{acha_extras}")
        }
        if(casEspMd_MC.length === 1 ){
            laudo = laudo.replace("{diag}","- Microcistos agrupados em mama direita, acima descrito.\n{diag}")
            
        }
        if(casEspMd_MC.length > 1 ){
            laudo = laudo.replace("{diag}","- Múltiplos microcistos agrupados em mama direita, acima descritos.\n{diag}")
            
        }
        

        let casEspMd_PI = document.querySelectorAll(".casEsp_ProtInt_Md")      
        if (casEspMd_PI.length>0){
            laudo = laudo.replace("{acha_extras}","- Prótese mamária íntegra em mama direita.\n{acha_extras}")
            laudo = laudo.replace("{diag}","- Prótese mamária íntegra em mama direita.\n{diag}")
        }

        //
        let casEspMd_LM = document.querySelectorAll(".casEsp_linImMdLocSel")
        for (i=0;i<casEspMd_LM.length;i++){
            let casEspMd_LM_a = casEspMd_LM[i].options[casEspMd_LM[i].selectedIndex].text;

            let medLinfIM_Md = document.querySelectorAll(".casEsp_med_linfImMd");
            if(medLinfIM_Md[i].value.length === 0){
                laudo = laudo.replace("{acha_extras}","- Imagem nodular oval, circunscrita, paralela à pele, sem elementos acústicos posteriores, com centro ecogênico, localizada às "+casEspMd_LM_a+" da mama direita, sugestiva de linfonodo intramamário.\n{acha_extras}")

            }
            if(medLinfIM_Md[i].value.length > 0){
                laudo = laudo.replace("{acha_extras}","- Imagem nodular oval, circunscrita, paralela à pele, sem elementos acústicos posteriores, com centro ecogênico, localizada às "+casEspMd_LM_a+" da mama direita, medindo "+medLinfIM_Md[i].value+" cm, sugestiva de linfonodo intramamário.\n{acha_extras}")

            }

            
        } 
        if(casEspMd_LM.length === 1 ){
            laudo = laudo.replace("{diag}","- Linfonodo intramamário em mama direita acima descrito.\n{diag}")
            
        }
        if(casEspMd_LM.length > 1 ){
            laudo = laudo.replace("{diag}","- Linfonodos intramamários em mama direita acima descritos.\n{diag}")
            
        }      


        




    }

    /// MAMA ESQUERDA ///

    if(document.getElementById("nodulos_me").checked){
        if(qtosNodMe == 1){
            var forma = document.getElementById("nod_me_forma1").options[document.getElementById("nod_me_forma1").selectedIndex].text;
            var margem = document.getElementById("nod_me_margem1").options[document.getElementById("nod_me_margem1").selectedIndex].text;
            var paralela = document.getElementById("nod_me_orientacao1").options[document.getElementById("nod_me_orientacao1").selectedIndex].text;
            var eco = document.getElementById("nod_me_eco1").options[document.getElementById("nod_me_eco1").selectedIndex].text;
            var reforco = document.getElementById("nod_me_posterior1").selectedIndex;
            if(reforco === 0){
                reforco = "sem apresentar elementos acústicos posteriores";
            }
            if(reforco === 1){
                reforco = "apresentando reforço acústico posterior";
            }
            if(reforco === 2){
                reforco = "apresentando sombra acústica posterior";
            }
            if(reforco === 3){
                reforco = "apresentando aspecto acústico posterior misto";
            }

            var medidas = document.getElementById("medida_nod_me1").value.split(" ");
            
            if(medidas == null || medidas == ""){
                 medidas = "ATENÇÃO! NÓDULO SEM MEDIDA";
                 alert("Atenção: Nódulo em mama esquerda sem medida!")                
            }else{                
                if(medidas.length === 1){
                    medidas = medidas[0].toString() + " cm";
                }
                if(medidas.length === 2){
                    medidas =medidas[0].toString() + " x " + medidas[1].toString() +" cm";
                }
                if(medidas.length === 3){
                    var nod1 = parseFloat(medidas[0]);
                    var nod2 = parseFloat(medidas[1]);
                    var nod3 = parseFloat(medidas[2]);
                    var nodVol = parseFloat(nod1*nod2*nod3*0.523).toFixed(1);
                    medidas =  nod1.toString() + " x " + nod2.toString() + " x " + nod3.toString() + " cm, com volume aproximado de "+nodVol.toString()+" cm³";
                    // medidas = medidas[0].toString() + " x " + medidas[1].toString() + " cm, distando "+medidas[2].toString()+" cm da pele"
    
                }

            }

            var disPeleMamilo = document.getElementById("nod_me_distMaPe1").value
            if(disPeleMamilo.length > 0){
                disPeleMamilo = document.getElementById("nod_me_distMaPe1").value.split(" ");
                if(disPeleMamilo.length === 1){
                    disPeleMamilo = " distando "+disPeleMamilo[0]+" cm do mamilo, "
                }
                if(disPeleMamilo.length === 2){
                    disPeleMamilo = " distando "+disPeleMamilo[0]+" cm do mamilo e "+disPeleMamilo[1]+" cm da pele, "
                }

            }
            if(disPeleMamilo.length === 0){
                
                disPeleMamilo = "";
                disPeleMamilo.trim();

            }

            var localizacao = document.getElementById("nod_me_localizacao1").selectedIndex;
            if(localizacao === 12){
                localizacao = " em localização retroareolar";
            }else if(localizacao === 13){
                localizacao = " em localização periareolar";
            }else{
                localizacao = " localizado às "+document.getElementById("nod_me_localizacao1").options[document.getElementById("nod_me_localizacao1").selectedIndex].text;
                // console.log(localizacao.Option.value)
            }
            var tipo = document.getElementById("nod_me_tipo1").options[document.getElementById("nod_me_tipo1").selectedIndex].text;
            if(tipo === "Ilhota de gordura"){
                tipo = 'nódulo sólido ou ilhota de gordura'
            }


            if(document.getElementById("nod_me_marcarPAAF1").checked){                
                laudo = laudo.replace("{recomedacoes}","- Sugere-se realizar PAAF no cisto em mama esquerda acima descrito.\n{recomedacoes}");

            }
            if(document.getElementById("nod_me_marcarCore1").checked){
                laudo = laudo.replace("{recomedacoes}","- Sugere-se realizar Core Biopsy no nódulo em mama esquerda acima descrito.\n{recomedacoes}");

            }



            
            laudo = laudo.replace("{mama_esq}","- Parênquima mamário esquerdo apresentando a seguinte imagem nodular:\n{nod_me}");
            laudo = laudo.replace("{nod_me}","Imagem nodular "+forma+", "+margem+", de orientação "+paralela+" à pele, de conteúdo "+eco+", "+reforco+", medindo "+medidas+","+disPeleMamilo+""+localizacao+", sugestiva de "+tipo+".\n{nod_me}");
            
        }

        if(qtosNodMe > 1){
            for(i=1;i<=qtosNodMe;i++){
                var forma = document.getElementById("nod_me_forma"+i).options[document.getElementById("nod_me_forma"+i).selectedIndex].text;
                var margem = document.getElementById("nod_me_margem"+i).options[document.getElementById("nod_me_margem"+i).selectedIndex].text;
                var paralela = document.getElementById("nod_me_orientacao"+i).options[document.getElementById("nod_me_orientacao"+i).selectedIndex].text;
                var eco = document.getElementById("nod_me_eco"+i).options[document.getElementById("nod_me_eco"+i).selectedIndex].text;
                var reforco = document.getElementById("nod_me_posterior"+i).selectedIndex;
                if(reforco === 0){
                    reforco = "sem apresentar elementos acústicos posteriores";
                }
                if(reforco === 1){
                    reforco = "apresentando reforço acústico posterior";
                }
                if(reforco === 2){
                    reforco = "apresentando sombra acústica posterior";
                }
                if(reforco === 3){
                    reforco = "apresentando aspecto acústico posterior misto";
                }

                var medidas = document.getElementById("medida_nod_me"+i).value.split(" ");
                if(medidas == null || medidas == ""){
                    medidas = "ATENÇÃO! NÓDULO SEM MEDIDA";
                    alert("Atenção: Nódulo N"+i+" em mama esquerda sem medida!")                
               }else{
                if(medidas.length === 1){
                    medidas = medidas[0].toString() + " cm";
                }
                if(medidas.length === 2){
                    medidas = medidas[0].toString() + " x " + medidas[1].toString() +" cm";
                }
                if(medidas.length === 3){
                    var nod1 = parseFloat(medidas[0]);
                    var nod2 = parseFloat(medidas[1]);
                    var nod3 = parseFloat(medidas[2]);
                    var nodVol = parseFloat(nod1*nod2*nod3*0.523).toFixed(1);
                    medidas =  nod1.toString() + " x " + nod2.toString() + " x " + nod3.toString() + " cm, com volume aproximado de "+nodVol.toString()+" cm³";
    
                }

               }

               var disPeleMamilo = document.getElementById("nod_me_distMaPe"+i).value
               if(disPeleMamilo.length > 0){
                   disPeleMamilo = document.getElementById("nod_me_distMaPe"+i).value.split(" ");
                   if(disPeleMamilo.length === 1){
                       disPeleMamilo = " distando "+disPeleMamilo[0]+" cm do mamilo, "
                   }
                   if(disPeleMamilo.length === 2){
                       disPeleMamilo = " distando "+disPeleMamilo[0]+" cm do mamilo e "+disPeleMamilo[1]+" cm da pele, "
                   }
   
               }
               if(disPeleMamilo.length === 0){
                   
                   disPeleMamilo = "";
                   disPeleMamilo.trim();
   
               }




                var localizacao = document.getElementById("nod_me_localizacao"+i).selectedIndex;
                if(localizacao === 12){
                    localizacao = " em localização retroareolar";
                }else if(localizacao === 13){
                    localizacao = " em localização periareolar";
                }else{
                    localizacao = " localizado às "+document.getElementById("nod_me_localizacao"+i).options[document.getElementById("nod_me_localizacao"+i).selectedIndex].text;
                    // console.log(localizacao.Option.value)
                }
                var tipo = document.getElementById("nod_me_tipo"+i).options[document.getElementById("nod_me_tipo"+i).selectedIndex].text;
                if(tipo === "Ilhota de gordura"){
                    tipo = 'nódulo sólido ou ilhota de gordura'
                }

                if(document.getElementById("nod_me_marcarPAAF"+i).checked){                
                    laudo = laudo.replace("{recomedacoes}","- Sugere-se realizar PAAF em N"+i+" em mama esquerda acima descrito.\n{recomedacoes}");
    
                }
                if(document.getElementById("nod_me_marcarCore"+i).checked){
                    laudo = laudo.replace("{recomedacoes}","- Sugere-se realizar Core Biopsy em N"+i+" em mama esquerda acima descrito.\n{recomedacoes}");
    
                }
    
                
                laudo = laudo.replace("{mama_esq}","- Parênquima mamário esquerdo apresentando as seguintes imagens nodulares:\n{nod_me}");
                laudo = laudo.replace("{nod_me}","N"+i+": Imagem nodular "+forma+", "+margem+", de orientação "+paralela+" à pele, de conteúdo "+eco+", "+reforco+", medindo "+medidas+","+disPeleMamilo+""+localizacao+", sugestiva de "+tipo+".\n{nod_me}");

            }
        }
    }

    if(document.getElementById("calcificacoes_me").checked){
        for (i=1;i<=qtasCalcMe;i++){
            var locCalMe = document.getElementById("calc_me"+i).options[document.getElementById("calc_me"+i).selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Presença de focos de calcificação em "+locCalMe+" da mama esquerda.\n{acha_extras}")
        }
        if (qtasCalcMe===1){
            laudo = laudo.replace("{diag}","- Presença de focos de calcificação em "+locCalMe+" da mama esquerda.\n{diag}")
        }
        if (qtasCalcMe>1){
            laudo = laudo.replace("{diag}","- Presença de focos de calcificação em mama esquerda acima descritos.\n{diag}")
        }


    }

    //Funciona
    if(document.getElementById("carAss_me").checked){
        var carAssMeX = document.getElementById("carAss_me_select").selectedIndex;

        
        var carAssMe_xx = document.querySelectorAll(".dist_arq_me")

        for (i=0;i<carAssMe_xx.length;i++){
            var carAssMe_xa = carAssMe_xx[i].options[carAssMe_xx[i].selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Sinais de distorção arquitetural em "+carAssMe_xa+" da mama esquerda.\n{acha_extras}")
        }
        if(carAssMe_xx.length === 1){
            laudo = laudo.replace("{diag}","- Sinais de distorção arquitetural em "+carAssMe_xa+" da mama esquerda.\n{diag}")
        }
        if(carAssMe_xx.length > 1){
            laudo = laudo.replace("{diag}","- Áreas de distorção arquitetural em mama esquerda acima descritas.\n{diag}")
        }

        var carAssMe_EDSM = document.querySelectorAll(".edsm_me")            
        for (i=0;i<carAssMe_EDSM.length;i++){
            laudo = laudo.replace("{acha_extras}","- Ectasia ductal sem material em seu interior.\n{acha_extras}")
        }
        if(carAssMe_EDSM.length === 1){
            laudo = laudo.replace("{diag}","- Ectasia ductal na mama esquerda sem material em seu interior.\n{diag}")
        }

        var medMatDuc = document.querySelectorAll(".medida_MedectDuctMat_me");
        for (i=0;i<medMatDuc.length;i++){
            
            if(medMatDuc[i].value.length === 0){
                laudo = laudo.replace("{acha_extras}","- Ectasia ductal apresentando material em seu interior.\n{acha_extras}")

            }
            if(medMatDuc[i].value.length > 0){
                var edcm_med = medMatDuc[i].value;
                laudo = laudo.replace("{acha_extras}","- Ectasia ductal apresentando material em seu interior, medindo "+edcm_med+" cm.\n{acha_extras}")
            }
            
        }
        if(medMatDuc.length === 1){
            laudo = laudo.replace("{diag}","- Ectasia ductal na mama esquerda com material em seu interior, acima descrita.\n{diag}")
            laudo = laudo.replace("{recomedacoes}","- Sugere-se prosseguir investigação com Core Biopsy de material no interior de ductos em mama esquerda.\n{diag}")
        }




        var carAssMe_EspPeleX = document.querySelectorAll(".espessamento_pele_me");
        for (let index = 0; index < carAssMe_EspPeleX.length; index++) {
            const carAssMe_EspPeleX_select = carAssMe_EspPeleX[index].options[carAssMe_EspPeleX[index].selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Sinais de espessamento da pele em "+carAssMe_EspPeleX_select+" da mama esquerda.\n{acha_extras}");
            
        }
        if(carAssMe_EspPeleX.length >0 ){
            laudo = laudo.replace("{diag}","- Sinais de espessamento de pele em mama esquerda, acima descrita.\n{diag}")
            
        }
                
        let carAssMe_RetPele = document.querySelectorAll(".retracao_pele_me");
        for (let index2 = 0; index2 < carAssMe_RetPele.length; index2++) {
            const carAssMe_RetPele_select = carAssMe_RetPele[index2].options[carAssMe_RetPele[index2].selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Sinais de retração da pele em "+carAssMe_RetPele_select+" da mama esquerda.\n{acha_extras}")
            
        }
        if(carAssMe_RetPele.length >0 ){
            laudo = laudo.replace("{diag}","- Sinais de retração de pele em mama esquerda, acima descrita.\n{diag}")
            
        }

        
   
    }

    
    if(document.getElementById("casEsp_me").checked){
        let casEspMe_MC = document.querySelectorAll(".casEsp_MicroCisAgr_me")
        for (i=0;i<casEspMe_MC.length;i++){
            let casEspMe_MC_a = casEspMe_MC[i].options[casEspMe_MC[i].selectedIndex].text;
            laudo = laudo.replace("{acha_extras}","- Microcistos agrupados em "+casEspMe_MC_a+" da mama esquerda.\n{acha_extras}")
        }
        if(casEspMe_MC.length === 1 ){
            laudo = laudo.replace("{diag}","- Microcistos agrupados em mama esquerda, acima descrito.\n{diag}")
            
        }
        if(casEspMe_MC.length > 1 ){
            laudo = laudo.replace("{diag}","- Múltiplos microcistos agrupados em mama esquerda, acima descritos.\n{diag}")
            
        }
        

        let casEspMe_PI = document.querySelectorAll(".casEsp_ProtInt_Me")      
        if (casEspMe_PI.length>0){
            laudo = laudo.replace("{acha_extras}","- Prótese mamária íntegra em mama esquerda.\n{acha_extras}")
            laudo = laudo.replace("{diag}","- Prótese mamária íntegra em mama esquerda.\n{diag}")
        }

        //
        let casEspMe_LM = document.querySelectorAll(".casEsp_linImMeLocSel")
        for (i=0;i<casEspMe_LM.length;i++){
            let casEspMe_LM_a = casEspMe_LM[i].options[casEspMe_LM[i].selectedIndex].text;

            let medLinfIM_Me = document.querySelectorAll(".casEsp_med_linfImMe");
            if(medLinfIM_Me[i].value.length === 0){
                laudo = laudo.replace("{acha_extras}","- Imagem nodular oval, circunscrita, paralela à pele, sem elementos acústicos posteriores, com centro ecogênico, localizada às "+casEspMe_LM_a+" da mama esquerda, sugestiva de linfonodo intramamário.\n{acha_extras}")

            }
            if(medLinfIM_Me[i].value.length > 0){
                laudo = laudo.replace("{acha_extras}","- Imagem nodular oval, circunscrita, paralela à pele, sem elementos acústicos posteriores, com centro ecogênico, localizada às "+casEspMe_LM_a+" da mama esquerda, medindo "+medLinfIM_Me[i].value+" cm, sugestiva de linfonodo intramamário.\n{acha_extras}")

            }

            
        } 
        if(casEspMe_LM.length === 1 ){
            laudo = laudo.replace("{diag}","- Linfonodo intramamário em mama esquerda acima descrito.\n{diag}")
            
        }
        if(casEspMe_LM.length > 1 ){
            laudo = laudo.replace("{diag}","- Linfonodos intramamários em mama esquerda acima descritos.\n{diag}")
            
        }      


        




    }




    ///////////////////////////////

    // if(document.getElementById("nodulos_me").checked){
    //     if(qtosNodMe == 1){
    //         var forma = document.getElementById("nod_me_forma1").options[document.getElementById("nod_me_forma1").selectedIndex].text;
    //         var margem = document.getElementById("nod_me_margem1").options[document.getElementById("nod_me_margem1").selectedIndex].text;
    //         var paralela = document.getElementById("nod_me_orientacao1").options[document.getElementById("nod_me_orientacao1").selectedIndex].text;
    //         var eco = document.getElementById("nod_me_eco1").options[document.getElementById("nod_me_eco1").selectedIndex].text;
    //         var reforco = document.getElementById("nod_me_posterior1").selectedIndex;
    //         if(reforco === 0){
    //             reforco = "sem apresentar elementos acústicos posteriores";
    //         }
    //         if(reforco === 1){
    //             reforco = "apresentando reforço acústico posterior";
    //         }
    //         if(reforco === 2){
    //             reforco = "apresentando sombra acústica posterior";
    //         }
    //         if(reforco === 3){
    //             reforco = "apresentando aspecto acústico posterior misto";
    //         }
    //         var medidas = document.getElementById("medida_nod_me1").value.split(" ");
    //         if(medidas.length === 1){
    //             medidas = medidas[0].toString() + " cm";
    //         }
    //         if(medidas.length === 2){
    //             medidas = medidas[0].toString() + " x " + medidas[1].toString() +" cm";
    //         }
    //         if(medidas.length === 3){
    //             medidas = medidas[0].toString() + " x " + medidas[1].toString() + " cm, distando "+medidas[2].toString()+" cm da pele"

    //         }
    //         if(medidas.length === 4){
    //             var nod1 = parseFloat(medidas[0]);
    //             var nod2 = parseFloat(medidas[1]);
    //             var nod3 = parseFloat(medidas[2]);
    //             var nodVol = parseFloat(nod1*nod2*nod3*0.523).toFixed(1);
    //             medidas = nod1.toString() + " x " + nod2.toString() + " x " + nod3.toString() + " cm, com volume aproximado de "+nodVol.toString()+" cm³, distando "+medidas[3].toString()+" cm da pele"

    //         }
    //         var localizacao = document.getElementById("nod_me_localizacao1").selectedIndex;
    //         if(localizacao === 12){
    //             localizacao = " em localização retroareolar";
    //         }else if(localizacao === 13){
    //             localizacao = " em localização periareolar";
    //         }else{
    //             localizacao = " localizado às "+document.getElementById("nod_me_localizacao1").options[document.getElementById("nod_me_localizacao1").selectedIndex].text;
    //             // console.log(localizacao.Option.value)
    //         }
    //         var tipo = document.getElementById("nod_me_tipo1").options[document.getElementById("nod_me_tipo1").selectedIndex].text;

            
    //         laudo = laudo.replace("{mama_esq}","Parênquima mamário esquerdo apresentando a seguinte imagem nodular:\n{nod_me}");
    //         laudo = laudo.replace("{nod_me}","Imagem nodular "+forma+", "+margem+", de orientação "+paralela+" à pele, de conteúdo "+eco+", "+reforco+", medindo "+medidas+","+localizacao+", sugestiva de "+tipo+".\n{nod_me}");
            
    //     }

    //     if(qtosNodMe > 1){
    //         for(i=1;i<=qtosNodMe;i++){
    //             var forma = document.getElementById("nod_me_forma"+i).options[document.getElementById("nod_me_forma"+i).selectedIndex].text;
    //             var margem = document.getElementById("nod_me_margem"+i).options[document.getElementById("nod_me_margem"+i).selectedIndex].text;
    //             var paralela = document.getElementById("nod_me_orientacao"+i).options[document.getElementById("nod_me_orientacao"+i).selectedIndex].text;
    //             var eco = document.getElementById("nod_me_eco"+i).options[document.getElementById("nod_me_eco"+i).selectedIndex].text;
    //             var reforco = document.getElementById("nod_me_posterior"+i).selectedIndex;
    //             if(reforco === 0){
    //                 reforco = "sem apresentar elementos acústicos posteriores";
    //             }
    //             if(reforco === 1){
    //                 reforco = "apresentando reforço acústico posterior";
    //             }
    //             if(reforco === 2){
    //                 reforco = "apresentando sombra acústica posterior";
    //             }
    //             if(reforco === 3){
    //                 reforco = "apresentando aspecto acústico posterior misto";
    //             }
    //             var medidas = document.getElementById("medida_nod_me"+i).value.split(" ");
    //             if(medidas.length === 1){
    //                 medidas = medidas[0].toString() + " cm";
    //             }
    //             if(medidas.length === 2){
    //                 medidas = medidas[0].toString() + " x " + medidas[1].toString() +" cm";
    //             }
    //             if(medidas.length === 3){
    //                 medidas = medidas[0].toString() + " x " + medidas[1].toString() + " cm, distando "+medidas[2].toString()+" cm da pele"
    
    //             }
    //             if(medidas.length === 4){
    //                 var nod1 = parseFloat(medidas[0]);
    //                 var nod2 = parseFloat(medidas[1]);
    //                 var nod3 = parseFloat(medidas[2]);
    //                 var nodVol = parseFloat(nod1*nod2*nod3*0.523).toFixed(1);
    //                 medidas = nod1.toString() + " x " + nod2.toString() + " x " + nod3.toString() + " cm, com volume aproximado de "+nodVol.toString()+" cm³, distando "+medidas[3].toString()+" cm da pele"
    
    //             }
    //             var localizacao = document.getElementById("nod_me_localizacao"+i).selectedIndex;
    //             if(localizacao === 12){
    //                 localizacao = " em localização retroareolar";
    //             }else if(localizacao === 13){
    //                 localizacao = " em localização periareolar";
    //             }else{
    //                 localizacao = " localizado às "+document.getElementById("nod_me_localizacao"+i).options[document.getElementById("nod_me_localizacao"+i).selectedIndex].text;
    //                 // console.log(localizacao.Option.value)
    //             }
    //             var tipo = document.getElementById("nod_me_tipo"+i).options[document.getElementById("nod_me_tipo"+i).selectedIndex].text;
    
                
    //             laudo = laudo.replace("{mama_esq}","Parênquima mamário esquerdo apresentando as seguintes imagens nodulares:\n{nod_me}");
    //             laudo = laudo.replace("{nod_me}","N"+i+": Imagem nodular "+forma+", "+margem+", de orientação "+paralela+" à pele, de conteúdo "+eco+", "+reforco+", medindo "+medidas+","+localizacao+", sugestiva de "+tipo+".\n{nod_me}");

    //         }

    //     }
    // }

    //achar nódulos e cistos no texto da mama esquerda
    var mamaEsqIni = laudo.indexOf("{ini_me}");
    var mamaEsqFim = laudo.indexOf("{fim_me}");
    var mamaEsq = laudo.substring(mamaEsqIni,mamaEsqFim);
    var contarCistosMe = (mamaEsq.match(/Cisto simples/g) || []).length;
    var contarNodMe = (mamaEsq.match(/Nódulo sólido/g) || []).length;
    var contarCistoEspessoMe = (mamaEsq.match(/Cisto espesso/g) || []).length;
    var contarCistoComplexoMe = (mamaEsq.match(/Cisto complexo/g) || []).length;
    if(contarCistosMe === 1){
        laudo = laudo.replace("{diag}","- Cisto simples em mama esquerda acima descrito.\n{diag}");
    }else if(contarCistosMe > 1){
        laudo = laudo.replace("{diag}","- Cistos simples em mama esquerda acima descritos.\n{diag}");
    }
    if(contarNodMe === 1){
        laudo = laudo.replace("{diag}","- Nódulo sólido em mama esquerda acima descrito.\n{diag}");
    }else if(contarNodMe > 1){
        laudo = laudo.replace("{diag}","- Nódulos sólidos em mama esquerda acima descritos.\n{diag}");
    }
    if(contarCistoEspessoMe === 1){
        laudo = laudo.replace("{diag}","- Cisto espesso em mama esquerda acima descrito.\n{diag}");
    }else if(contarCistoEspessoMe > 1){
        laudo = laudo.replace("{diag}","- Cistos espessos em mama esquerda acima descritos.\n{diag}");
    }
    if(contarCistoComplexoMe === 1){
        laudo = laudo.replace("{diag}","- Cisto complexo em mama esquerda acima descrito.\n{diag}");
    }else if(contarCistoComplexoMe > 1){
        laudo = laudo.replace("{diag}","- Cistos complexos em mama esquerda acima descritos.\n{diag}");
    }

    //achar nódulos e cistos no texto da mama direita
    var mamaDirIni = laudo.indexOf("{ini_md}");
    var mamaDirFim = laudo.indexOf("{fim_md}");
    var mamaDir = laudo.substring(mamaDirIni,mamaDirFim);
    var contarCistosMd = (mamaDir.match(/Cisto simples/g) || []).length;
    var contarNodMd = (mamaDir.match(/Nódulo sólido/g) || []).length;
    var contarCistoEspessoMd = (mamaDir.match(/Cisto espesso/g) || []).length;
    var contarCistoComplexoMd = (mamaDir.match(/Cisto complexo/g) || []).length;
    if(contarCistosMd === 1){
        laudo = laudo.replace("{diag}","- Cisto simples em mama direita acima descrito.\n{diag}");
    }else if(contarCistosMd > 1){
        laudo = laudo.replace("{diag}","- Cistos simples em mama direita acima descritos.\n{diag}");
    }
    if(contarNodMd === 1){
        laudo = laudo.replace("{diag}","- Nódulo sólido em mama direita acima descrito.\n{diag}");
    }else if(contarNodMd > 1){
        laudo = laudo.replace("{diag}","- Nódulos sólidos em mama direita acima descritos.\n{diag}");
    }
    if(contarCistoEspessoMd === 1){
        laudo = laudo.replace("{diag}","- Cisto espesso em mama direita acima descrito.\n{diag}");
    }else if(contarCistoEspessoMd > 1){
        laudo = laudo.replace("{diag}","- Cistos espessos em mama direita acima descritos.\n{diag}");
    }
    if(contarCistoComplexoMd === 1){
        laudo = laudo.replace("{diag}","- Cisto complexo em mama direita acima descrito.\n{diag}");
    }else if(contarCistoComplexoMd > 1){
        laudo = laudo.replace("{diag}","- Cistos complexos em mama direita acima descritos.\n{diag}");
    }
   
    laudo = laudo.replace("{ini_md}","");
    laudo = laudo.replace("{mama_dir}","");
    laudo = laudo.replace("{fim_md}","");
    laudo = laudo.replace("{ini_me}","");
    laudo = laudo.replace("{fim_me}","");
    laudo = laudo.replace("{mama_esq}","");
    laudo = laudo.replace("{diag}","");
    laudo = laudo.replace("{nod_md}","");
    laudo = laudo.replace("{nod_me}","");
    laudo = laudo.replace("{recomedacoes}","");
    laudo = laudo.replace("{acha_extras}",""); 

    //eliminar linhas em branco desnecessárias
    var laudo_final = laudo.replace(/^\s*$[\n\r]{1,}/gm, '');



    //como copiar o texto do Quill para área de trabalho ao gerar o laudo
    var editor_id = document.querySelector(".ql-editor")
    editor_id.setAttribute("id","laudo_texto") 

    //como adicionar texto no quill já formatado. ver modelo lá em cima
    editor.root.innerHTML = laudo_final;

    document.getElementById("GerarLaudo").setAttribute("data-clipboard-target","#laudo_texto")
    var clipboard = new ClipboardJS(".GeraLaudo");
    


 

    

    }

   


function volume(){

    // falta fazer 2 medidas
    // separar por 'por' 
    //trocar vírgula por ponto - ok
    var texto = document.getElementById("laudo").value;
    var regex = /\d+[\,\.]\d+\s\d+[\,\.]\d+\s\d+[\,\.]\d+/gm;

    var match = regex.exec(texto);
    var nums = match[0].replace(/\,/g,".");
    console.log(match);

    var numeros = nums.split(" ");

    numeros.sort(function(a, b){return b-a;});//em ordem decrescente.

    var num1 = numeros[0];
    var num2 = numeros[1];
    var num3 = numeros[2];

    var volume = (num1*num2*num3*0.523).toFixed(1);//arredodar para uma casa decimal    
    var nums2 = match[0].split(" ");// precisa disso para a linha abaixo funcionar
    texto = texto.replace(nums2[0]+" "+nums2[1]+" "+nums2[2]+" ",num1+" x "+num2+" x "+num3+" cm, com volume estimado em "+volume.toString()+" cm³.")    
    document.getElementById("laudo").value = texto;

}

// funcionou: faltar saber colocar uma forma de manter ligado e desligar e não apagar o que já foi escrito apenas adicionar texto
function voz(){

    // try {
    //     var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //     var recognition = new SpeechRecognition();
    //   }
    //   catch(e) {
    //     console.error(e);
    //     $('.no-browser-support').show();
    //     $('.app').hide();
    //   }
    // recognition.onstart = function() { 
    // instructions.text('Voice recognition activated. Try speaking into the microphone.');
    // }
    
    // recognition.onspeechend = function() {
    // instructions.text('You were quiet for a while so voice recognition turned itself off.');
    // }
    
    // recognition.onerror = function(event) {
    // if(event.error == 'no-speech') {
    //     instructions.text('No speech was detected. Try again.');  
    // };
    // }
    // recognition.onresult = function(event) {

    //     // event is a SpeechRecognitionEvent object.
    //     // It holds all the lines we have captured so far. 
    //     // We only need the current one.
    //     var current = event.resultIndex;
      
    //     // Get a transcript of what was said.
    //     var transcript = event.results[current][0].transcript;
      
    //     // Add the current transcript to the contents of our Note.


    //     // noteContent += transcript;
    //     // noteTextarea.val(noteContent);

    //     document.getElementById("laudo").value = transcript;
    //   }

    //   recognition.start();




    
    // if (window.hasOwnProperty('webkitSpeechRecognition')) {

    //     var recognition = new webkitSpeechRecognition();
  
    //     recognition.continuous = false;
    //     recognition.interimResults = false;
  
    //     recognition.lang = "pt-BR";
    //     recognition.start();
  
    //     recognition.onresult = function(e) {
    //       document.getElementById('laudo').value
    //                                = e.results[0][0].transcript;
    //     //   recognition.stop();
    //     //   document.getElementById('labnol').submit();
    //     };
  
    //     recognition.onerror = function(e) {
    //     //   recognition.stop();
    //     }
  
    //   }

}

function criar_nodulos_md(){

    if(document.getElementById("nodulos_md").checked){

        let lado = "md";
        qtosNodMd++; 
        let container = document.getElementById("nodulos_md_desc");

        //criar uma div para cada nódulo
        let divNod = document.createElement('div');
        divNod.id = "nod_md_divId"+(qtosNodMd); 
        container.appendChild(divNod);

        //adicionar os nódulos à div de cada nódulo

        // divNod.appendChild(document.createTextNode("N"+(qtosNodMd)+": "));

        let numNod = document.createElement("label");
        // tipoLabl.setAttribute("for","nod_md_tipo"+(qtosNodMd));
        numNod.innerHTML = "N"+(qtosNodMd)+": ";
        numNod.id = "nod_md_numNodId"+(qtosNodMd); 
        numNod.className = "nod_md_numero"
        divNod.appendChild(numNod);
        
        // Tipo de nódulo

        // como criar as labels
        var tipoLabl = document.createElement("label");
        tipoLabl.setAttribute("for","nod_md_tipo"+(qtosNodMd));
        tipoLabl.innerHTML = "Tipo: "
        divNod.appendChild(tipoLabl);

        // como criar os selects
        var tipo = document.createElement("select");
        tipo.setAttribute("onchange","mudarDescritoresNod("+(qtosNodMd)+")");
        tipo.options[tipo.options.length] = new Option('Cisto simples');
        tipo.options[tipo.options.length] = new Option('Nódulo sólido');
        tipo.options[tipo.options.length] = new Option('Cisto espesso');
        tipo.options[tipo.options.length] = new Option('Cisto complexo');
        tipo.options[tipo.options.length] = new Option('Ilhota de gordura');
        tipo.id = "nod_md_tipo"+(qtosNodMd);  
        tipo.className = "nod_md_tipo"      
        divNod.appendChild(tipo);

        
        // Forma do nódulo
        // como criar as labels
        var formaLabl = document.createElement("label");
        formaLabl.setAttribute("for","nod_md_forma"+(qtosNodMd));
        formaLabl.innerHTML = "Forma: "
        divNod.appendChild(formaLabl);

        // como criar os selects
        var forma = document.createElement("select");
        forma.setAttribute("onchange","");
        forma.options[forma.options.length] = new Option('Oval');
        forma.options[forma.options.length] = new Option('Redondo');
        forma.options[forma.options.length] = new Option('Irregular');
        forma.id = "nod_md_forma"+(qtosNodMd); 
        forma.className  = "nod_md_forma"       
        divNod.appendChild(forma);


        // Margem do nódulo
        // como criar as labels
        var margemLabl = document.createElement("label");
        margemLabl.setAttribute("for","nod_md_margem"+(qtosNodMd));
        margemLabl.innerHTML = "Margem: "
        divNod.appendChild(margemLabl);

        // como criar os selects
        var margem = document.createElement("select");
        margem.setAttribute("onchange","");
        margem.options[margem.options.length] = new Option('Circunscrita');
        margem.options[margem.options.length] = new Option('Indistinta');
        margem.options[margem.options.length] = new Option('Angular');
        margem.options[margem.options.length] = new Option('Microlobulada');
        margem.options[margem.options.length] = new Option('Espiculada');
        margem.id = "nod_md_margem"+(qtosNodMd);  
        margem.className  = "nod_md_margem"      
        divNod.appendChild(margem);

        // Orientação
        // como criar as labels
        var orientacaoLabl = document.createElement("label");
        orientacaoLabl.setAttribute("for","nod_md_orientacao"+(qtosNodMd));
        orientacaoLabl.innerHTML = "Orientação: "
        divNod.appendChild(orientacaoLabl);

        // como criar os selects
        var orientacao = document.createElement("select");
        orientacao.setAttribute("onchange","");
        orientacao.options[orientacao.options.length] = new Option('Paralela');
        orientacao.options[orientacao.options.length] = new Option('Não paralela');
        orientacao.id = "nod_md_orientacao"+(qtosNodMd);
        orientacao.className  = "nod_md_orientacao"        
        divNod.appendChild(orientacao);

        // Ecogenicidade
        // como criar as labels
        var ecoLabl = document.createElement("label");
        ecoLabl.setAttribute("for","nod_md_eco"+(qtosNodMd));
        ecoLabl.innerHTML = "Eco: "
        divNod.appendChild(ecoLabl);

        // como criar os selects
        var eco = document.createElement("select");
        eco.setAttribute("onchange","");
        eco.options[eco.options.length] = new Option('Anecóico');
        eco.options[eco.options.length] = new Option('Hiperecóico');
        eco.options[eco.options.length] = new Option('Sólido-Cístico');
        eco.options[eco.options.length] = new Option('Hipoecóico');
        eco.options[eco.options.length] = new Option('Isoecóico');
        eco.options[eco.options.length] = new Option('Heterogêneo');
        eco.id = "nod_md_eco"+(qtosNodMd);  
        eco.className  = "nod_md_eco"      
        divNod.appendChild(eco);

        // Elementos posteriores
        // como criar as labels
        let posteriorLabl = document.createElement("label");
        posteriorLabl.setAttribute("for","nod_md_posterior"+(qtosNodMd));
        posteriorLabl.innerHTML = "Posterior: "
        divNod.appendChild(posteriorLabl);

        // como criar os selects
        var posterior = document.createElement("select");
        posterior.setAttribute("onchange","");
        posterior.options[posterior.options.length] = new Option('Ausente');
        posterior.options[posterior.options.length] = new Option('Reforço');
        posterior.options[posterior.options.length] = new Option('Sombra');
        posterior.options[posterior.options.length] = new Option('Misto');
        posterior.id = "nod_md_posterior"+(qtosNodMd); 
        posterior.className  = "nod_md_posterior"       
        divNod.appendChild(posterior);

        // Medidas
        // como criar as labels
        var medida = document.createElement("label");
        medida.setAttribute("for","nod_md_medida"+(qtosNodMd));
        medida.innerHTML = " Medidas: "
        divNod.appendChild(medida);

        // criar o input medidas
        var medida_nod_md = document.createElement("input"); 
        medida_nod_md.id = "medida_nod_md"+(qtosNodMd); 
        medida_nod_md.className  = "nod_md_medida" 
        medida_nod_md.size = "8";
        divNod.appendChild(medida_nod_md); 

        // Distância mamilo / pele
        // como criar as labels
        let distMamiloPelelbl = document.createElement("label");
        distMamiloPelelbl.setAttribute("for","nod_md_distMamiloPelelbl"+(qtosNodMd));
        distMamiloPelelbl.innerHTML = " Dist. mamilo/pele: "
        divNod.appendChild(distMamiloPelelbl);

        // criar o input medidas
        var distMamiloPele = document.createElement("input"); 
        distMamiloPele.id = "nod_md_distMaPe"+(qtosNodMd);  
        distMamiloPele.className  = "nod_md_distMaPe"
        distMamiloPele.size = "5";
        divNod.appendChild(distMamiloPele);

        // Localização
        // como criar as labels
        var localizacaoLabl = document.createElement("label");
        localizacaoLabl.setAttribute("for","nod_md_localizacao"+(qtosNodMd));
        localizacaoLabl.innerHTML = "Localização: "
        divNod.appendChild(localizacaoLabl);

        // como criar os selects
        var localizacao = document.createElement("select");
        localizacao.setAttribute("onchange","");
        localizacao.options[localizacao.options.length] = new Option('1/2 horas');
        localizacao.options[localizacao.options.length] = new Option('2/3 horas');
        localizacao.options[localizacao.options.length] = new Option('3/4 horas');
        localizacao.options[localizacao.options.length] = new Option('4/5 horas');
        localizacao.options[localizacao.options.length] = new Option('5/6 horas');
        localizacao.options[localizacao.options.length] = new Option('6/7 horas');
        localizacao.options[localizacao.options.length] = new Option('7/8 horas');
        localizacao.options[localizacao.options.length] = new Option('8/9 horas');
        localizacao.options[localizacao.options.length] = new Option('9/10 horas');
        localizacao.options[localizacao.options.length] = new Option('10/11 horas');
        localizacao.options[localizacao.options.length] = new Option('11/12 horas');
        localizacao.options[localizacao.options.length] = new Option('12/1 horas');
        localizacao.options[localizacao.options.length] = new Option('Retroareolar');
        localizacao.options[localizacao.options.length] = new Option('Periareolar');
        localizacao.id = "nod_md_localizacao"+(qtosNodMd);      
        localizacao.className  = "nod_md_localizacao"  
        divNod.appendChild(localizacao);

        // como criar as labels
        var marcarPAAF = document.createElement("input");
        marcarPAAF.type = 'checkbox';
        marcarPAAF.id = "nod_md_marcarPAAF"+(qtosNodMd);
        marcarPAAF.className  = "nod_md_marcarPAAF"
        // marcarPAAF.setAttribute("for","nod_md_marcarPAAF"+(qtosNodMd));
        divNod.appendChild(marcarPAAF);

        var marcarPAAFlbl = document.createElement("label");
        marcarPAAFlbl.setAttribute("for","nod_md_marcarPAAF"+(qtosNodMd));
        marcarPAAFlbl.innerHTML = 'PAAF?';
        divNod.appendChild(marcarPAAFlbl);

        // como criar as labels
        var marcarCore = document.createElement("input");
        marcarCore.type = 'checkbox';
        marcarCore.id = "nod_md_marcarCore"+(qtosNodMd);
        marcarCore.className  = "nod_md_marcarCore"
        // marcarCore.setAttribute("for","nod_md_marcarCore"+(qtosNodMd));
        divNod.appendChild(marcarCore);

        var marcarCorelbl = document.createElement("label");
        marcarCorelbl.setAttribute("for","nod_md_marcarCore"+(qtosNodMd));
        marcarCorelbl.innerHTML = 'Core?';
        divNod.appendChild(marcarCorelbl);
       
 
        // como criar as labels
        let removerNod = document.createElement("input");
        removerNod.type = 'button';
        removerNod.value = 'Remover';
        var tipo = "nod";
        removerNod.setAttribute("onclick","removerNod("+(qtosNodMd)+",\""+ lado + "\",\""+ tipo + "\")");   // assim que se passa uma string como parâmetro numa função           
        divNod.appendChild(removerNod);   


    

    }       
        
       

}
// função para mudar os selects de acordo com o tipo de nódulo
function mudarDescritoresNod(z){
    // let aaa = document.querySelectorAll(".nod_md_tipo");
    let aaa = document.getElementById("nod_md_tipo"+z).selectedIndex;
    if(aaa === 0){
        document.getElementById("nod_md_forma"+z).selectedIndex = 0;
        document.getElementById("nod_md_margem"+z).selectedIndex = 0;
        document.getElementById("nod_md_orientacao"+z).selectedIndex = 0;
        document.getElementById("nod_md_eco"+z).selectedIndex = 0;
        document.getElementById("nod_md_posterior"+z).selectedIndex = 0;

    }
    if(aaa === 1){
        document.getElementById("nod_md_forma"+z).selectedIndex = 0;
        document.getElementById("nod_md_margem"+z).selectedIndex = 0;
        document.getElementById("nod_md_orientacao"+z).selectedIndex = 0;
        document.getElementById("nod_md_eco"+z).selectedIndex = 3;
        document.getElementById("nod_md_posterior"+z).selectedIndex = 0;

    }
    if(aaa === 2){
        document.getElementById("nod_md_forma"+z).selectedIndex = 0;
        document.getElementById("nod_md_margem"+z).selectedIndex = 0;
        document.getElementById("nod_md_orientacao"+z).selectedIndex = 0;
        document.getElementById("nod_md_eco"+z).selectedIndex = 0;
        document.getElementById("nod_md_posterior"+z).selectedIndex = 0;

    }
    if(aaa === 3){
        document.getElementById("nod_md_forma"+z).selectedIndex = 0;
        document.getElementById("nod_md_margem"+z).selectedIndex = 0;
        document.getElementById("nod_md_orientacao"+z).selectedIndex = 0;
        document.getElementById("nod_md_eco"+z).selectedIndex = 0;
        document.getElementById("nod_md_posterior"+z).selectedIndex = 0;

    }
    if(aaa === 4){
        document.getElementById("nod_md_forma"+z).selectedIndex = 0;
        document.getElementById("nod_md_margem"+z).selectedIndex = 0;
        document.getElementById("nod_md_orientacao"+z).selectedIndex = 0;
        document.getElementById("nod_md_eco"+z).selectedIndex = 0;
        document.getElementById("nod_md_posterior"+z).selectedIndex = 0;

    }

    // document.getElementById("nod_md_forma"+z).selectedIndex = aaa;


    console.log(aaa)
    console.log(z)
}

// função para remover um nódulo, calcificações, características associadas e casos especiais
function removerNod(nod,lado,tipo){
    let element = document.getElementById(""+tipo+"_"+lado+"_divId"+nod);
    element.parentNode.removeChild(element);
    if(tipo === "nod" && lado === "md"){
        qtosNodMd--;
        

        // [id^='someId'] will match all ids starting with someId.

        // [id$='someId'] will match all ids ending with someId.

        // [id*='someId'] will match all ids containing someId.

        // FUNCIONA COMO ATUALIZAR OS IDs DE TODOS OS COMPONENTES DO NÓDULO
        var divIdNod = document.querySelectorAll("[id*='nod_md_divId']");        
        var tamanho_divIdNod = divIdNod.length
        for (b=0;b<tamanho_divIdNod;b++){
            var id_elemento = divIdNod[b].id;
            var novo_id = id_elemento.substring(0,id_elemento.length-1);
            divIdNod[b].id = novo_id+(b+1);
            var divIdNod_elementos = document.getElementById("nod_md_divId"+(b+1)).querySelectorAll(".nod_md_numero,.nod_md_tipo,.nod_md_forma,.nod_md_margem,.nod_md_orientacao,.nod_md_eco,.nod_md_posterior,.nod_md_medida,.nod_md_distMaPe,.nod_md_localizacao,.nod_md_marcarPAAF,.nod_md_marcarCore"); 
            var tamanho_divIdNod_elementos = divIdNod_elementos.length
            for(q=0;q<tamanho_divIdNod_elementos;q++){
                var id_elemento = divIdNod_elementos[q].id;
                var novo_id = id_elemento.substring(0,id_elemento.length-1);
                
                divIdNod_elementos[q].id = novo_id+(b+1);

                document.getElementById("nod_md_numNodId"+(b+1)).innerHTML = "N"+(b+1)+": "

            }


            
        }
        }
        // 
    if(tipo === "carAss" && lado === "md"){
        qtasCarAss--;
        var numIdCarAss = document.querySelectorAll(".carAss_md_numId");
            for(i=0;i<qtasCarAss;i++){
                numIdCarAss[i].innerHTML = (i+1)+": "
            }
        }
    if(tipo === "calc" && lado === "md"){
        qtasCalcMd--;
        var numIdCalcMd = document.querySelectorAll(".calc_md_numId");
        // console.log(qtasCalcMd)
        for(xx=0;xx<qtasCalcMd;xx++){
            numIdCalcMd[xx].innerHTML = (xx+1)+": "
        }    

    
    }
    if(tipo === "casosEsp" && lado === "md"){
        qtasCasEsp--;
        var numIdCasEspMd = document.querySelectorAll(".casEsp_md_numId");
        // console.log(qtasCalcMd)
        for(xx=0;xx<qtasCasEsp;xx++){
            numIdCasEspMd[xx].innerHTML = (xx+1)+": "
        }    

    
    }

    // mama esquerda

    if(tipo === "nod" && lado === "me"){
        qtosNodMe--;

        var divIdNod = document.querySelectorAll("[id*='nod_me_divId']");        
        var tamanho_divIdNod = divIdNod.length
        for (b=0;b<tamanho_divIdNod;b++){
            var id_elemento = divIdNod[b].id;
            var novo_id = id_elemento.substring(0,id_elemento.length-1);
            divIdNod[b].id = novo_id+(b+1);
            var divIdNod_elementos = document.getElementById("nod_me_divId"+(b+1)).querySelectorAll(".nod_me_numero,.nod_me_tipo,.nod_me_forma,.nod_me_margem,.nod_me_orientacao,.nod_me_eco,.nod_me_posterior,.nod_me_medida,.nod_me_distMaPe,.nod_me_localizacao,.nod_me_marcarPAAF,.nod_me_marcarCore"); 
            var tamanho_divIdNod_elementos = divIdNod_elementos.length
            for(q=0;q<tamanho_divIdNod_elementos;q++){
                var id_elemento = divIdNod_elementos[q].id;
                var novo_id = id_elemento.substring(0,id_elemento.length-1);
                
                divIdNod_elementos[q].id = novo_id+(b+1);

                document.getElementById("nod_me_numNodId"+(b+1)).innerHTML = "N"+(b+1)+": "

            }
   
        }
        }
        // 
    if(tipo === "carAss" && lado === "me"){
        qtasCarAssMe--;
        var numIdCarAssMe = document.querySelectorAll(".carAss_me_numId");
            for(i=0;i<qtasCarAssMe;i++){
                numIdCarAssMe[i].innerHTML = (i+1)+": "
            }
        }
    if(tipo === "calc" && lado === "me"){
        qtasCalcMe--;
        var numIdCalcMe = document.querySelectorAll(".calc_me_numId");        
        for(xx=0;xx<qtasCalcMe;xx++){
            numIdCalcMe[xx].innerHTML = (xx+1)+": "
        }    

    
    }
    if(tipo === "casosEsp" && lado === "me"){
        qtasCasEspMe--;
        var numIdCasEspMe = document.querySelectorAll(".casEsp_me_numId");        
        for(xx=0;xx<qtasCasEspMe;xx++){
            numIdCasEspMe[xx].innerHTML = (xx+1)+": "
        }       
    }    

}



//original
function calcificacoes_md(){
    if(document.getElementById("calcificacoes_md").checked){
        qtasCalcMd++;
        // console.log(qtasCalcMd);
        var container = document.getElementById("calcificacoes_md_desc"); 
        
        //criar uma div para cada característica
        let divCalcMd = document.createElement('div');
        divCalcMd.id = "calc_md_divId"+(qtasCalcMd); 
        container.appendChild(divCalcMd);

        let numCalcMd = document.createElement("label");
        // tipoLabl.setAttribute("for","nod_md_tipo"+(qtosNodMd));
        numCalcMd.innerHTML = ""+qtasCalcMd+": ";
        numCalcMd.id = "calc_md_numId"+(qtasCalcMd); 
        numCalcMd.className = "calc_md_numId";
        divCalcMd.appendChild(numCalcMd);

        // como criar as labels
        var calcMdlbl = document.createElement("label");
        calcMdlbl.setAttribute("for","calc_md_md"+(qtasCarAss));
        calcMdlbl.innerHTML = "Área de calcificação no parênquima mamário: "
        divCalcMd.appendChild(calcMdlbl);

        // como criar os selects
        var calcMdlblSel = document.createElement("select");
        calcMdlblSel.setAttribute("onchange","");
        calcMdlblSel.options[calcMdlblSel.options.length] = new Option('QSL');
        calcMdlblSel.options[calcMdlblSel.options.length] = new Option('QSM');
        calcMdlblSel.options[calcMdlblSel.options.length] = new Option('QIL');
        calcMdlblSel.options[calcMdlblSel.options.length] = new Option('QIM');
        calcMdlblSel.options[calcMdlblSel.options.length] = new Option('UUQQSS');
        calcMdlblSel.options[calcMdlblSel.options.length] = new Option('UUQQLL');
        calcMdlblSel.options[calcMdlblSel.options.length] = new Option('UUQQII');
        calcMdlblSel.options[calcMdlblSel.options.length] = new Option('UUQQMM');
        calcMdlblSel.id = "calc_md"+(qtasCalcMd);        
        divCalcMd.appendChild(calcMdlblSel);    
        
        
        let removerCalcMd = document.createElement("input");
        removerCalcMd.type = 'button';
        removerCalcMd.value = 'Remover';
        var tipo = "calc";
        var lado = "md";
        removerCalcMd.setAttribute("onclick","removerNod("+(qtasCalcMd)+",\""+ lado + "\",\""+ tipo + "\")");   // assim que se passa uma string como parâmetro numa função
        
        divCalcMd.appendChild(removerCalcMd);  

        divCalcMd.appendChild(document.createElement("br"));

    }

}

function caracteristicas_md(){
    if(document.getElementById("carAss_md").checked){

        qtasCarAss++
        // console.log(qtasCarAss)
        var caracte = document.getElementById("carAss_md_select").selectedIndex;
        var container = document.getElementById("carAss_md_desc"); 
        
        //criar uma div para cada característica
        let divCarMd = document.createElement('div');
        divCarMd.id = "carAss_md_divId"+(qtasCarAss); 
        container.appendChild(divCarMd);

        //adicionar os nódulos à div de cada nódulo

        // divNod.appendChild(document.createTextNode("N"+(qtosNodMd)+": "));

        let numCarAss = document.createElement("label");
        // tipoLabl.setAttribute("for","nod_md_tipo"+(qtosNodMd));
        numCarAss.innerHTML = ""+qtasCarAss+": ";
        numCarAss.id = "carAss_md_numId"+(qtasCarAss); 
        numCarAss.className = "carAss_md_numId"
        divCarMd.appendChild(numCarAss);

        // container.appendChild(document.createTextNode(""+(qtasCarAss)+": "));  

        let removerCarAss = document.createElement("input");
        removerCarAss.type = 'button';
        removerCarAss.value = 'Remover';
        var tipo = "carAss";
        var lado = "md";
        removerCarAss.setAttribute("onclick","removerNod("+(qtasCarAss)+",\""+ lado + "\",\""+ tipo + "\")");   // assim que se passa uma string como parâmetro numa função
        

        if(caracte === 0){
            divCarMd.appendChild(document.createTextNode("Distorção arquitetural: "));         

            // como criar as labels
            var formaLabl = document.createElement("label");
            formaLabl.setAttribute("for","carAss_md"+(qtasCarAss));
            formaLabl.innerHTML = "Localização: "
            divCarMd.appendChild(formaLabl);
    
            // como criar os selects
            var forma = document.createElement("select");
            forma.setAttribute("onchange","");
            forma.options[forma.options.length] = new Option('QSL');
            forma.options[forma.options.length] = new Option('QSM');
            forma.options[forma.options.length] = new Option('QIL');
            forma.options[forma.options.length] = new Option('QIM');
            forma.options[forma.options.length] = new Option('UUQQSS');
            forma.options[forma.options.length] = new Option('UUQQLL');
            forma.options[forma.options.length] = new Option('UUQQII');
            forma.options[forma.options.length] = new Option('UUQQMM');
            forma.id = "dist_arq_md"+(qtasCarAss);    
            forma.className =   "dist_arq_md"  
            divCarMd.appendChild(forma);            
         
            divCarMd.appendChild(removerCarAss);  

            divCarMd.appendChild(document.createElement("br"));

        }
        if(caracte === 1){
            divCarMd.appendChild(document.createTextNode("Ectasia ductal sem material"));  
            divCarMd.className =   "edsm_md"   
            divCarMd.appendChild(removerCarAss);  


            container.appendChild(document.createElement("br"));

        }
        if(caracte === 2){
            divCarMd.appendChild(document.createTextNode("Ectasia ductal com material: "));     
            
            // como criar as labels
            let ectDuctMat = document.createElement("label");
            ectDuctMat.setAttribute("for","carAss_md"+(qtasCarAss));
            ectDuctMat.innerHTML = "Tamanho:"
            divCarMd.appendChild(ectDuctMat);
    
            // criar o input medidas
            let MedectDuctMat = document.createElement("input"); 
            MedectDuctMat.id = "medida_MedectDuctMat"+(qtasCarAss);  
            MedectDuctMat.className = "medida_MedectDuctMat_md"
            divCarMd.appendChild(MedectDuctMat);    
            
            divCarMd.appendChild(removerCarAss);  

            divCarMd.appendChild(document.createElement("br"));

        }
        if(caracte === 3){
            divCarMd.appendChild(document.createTextNode("Espessamento da pele em: "));   
            
            // como criar os selects
            var espessamento_pele = document.createElement("select");
            espessamento_pele.setAttribute("onchange","");
            espessamento_pele.options[espessamento_pele.options.length] = new Option('QSL');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('QSM');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('QIL');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('QIM');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('UUQQSS');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('UUQQLL');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('UUQQII');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('UUQQMM');
            espessamento_pele.id = "espessamento_pele_md"+(qtasCarAss);        
            espessamento_pele.className = "espessamento_pele_md";
            divCarMd.appendChild(espessamento_pele);

            divCarMd.appendChild(removerCarAss);  

            divCarMd.appendChild(document.createElement("br"));

        }
        if(caracte === 4){
            divCarMd.appendChild(document.createTextNode("Retração da pele em: "));   
            
            // como criar os selects
            var retracao_pele = document.createElement("select");
            retracao_pele.setAttribute("onchange","");
            retracao_pele.options[retracao_pele.options.length] = new Option('QSL');
            retracao_pele.options[retracao_pele.options.length] = new Option('QSM');
            retracao_pele.options[retracao_pele.options.length] = new Option('QIL');
            retracao_pele.options[retracao_pele.options.length] = new Option('QIM');
            retracao_pele.options[retracao_pele.options.length] = new Option('UUQQSS');
            retracao_pele.options[retracao_pele.options.length] = new Option('UUQQLL');
            retracao_pele.options[retracao_pele.options.length] = new Option('UUQQII');
            retracao_pele.options[retracao_pele.options.length] = new Option('UUQQMM');
            retracao_pele.id = "retracao_pele_md"+(qtasCarAss);  
            retracao_pele.className =   "retracao_pele_md";    
            divCarMd.appendChild(retracao_pele);

            divCarMd.appendChild(removerCarAss);  

            container.appendChild(document.createElement("br"));

        }

        
        
        



    }
}

function casosEspeciais_md(){
    if(document.getElementById("casEsp_md").checked){

        qtasCasEsp++
        var caracte = document.getElementById("casEsp_md_select").selectedIndex;
        var container = document.getElementById("casosEsp_md_desc"); 
        
        //criar uma div para cada característica
        let divCasEspMd = document.createElement('div');
        divCasEspMd.id = "casosEsp_md_divId"+(qtasCasEsp); 
        container.appendChild(divCasEspMd);

        //adicionar os nódulos à div de cada nódulo

        // divNod.appendChild(document.createTextNode("N"+(qtosNodMd)+": "));

        let numCasEspe = document.createElement("label");
        // tipoLabl.setAttribute("for","nod_md_tipo"+(qtosNodMd));
        numCasEspe.innerHTML = ""+qtasCasEsp+": ";
        numCasEspe.id = "casEsp_md_numId"+(qtasCasEsp); 
        numCasEspe.className = "casEsp_md_numId"
        divCasEspMd.appendChild(numCasEspe);

        // container.appendChild(document.createTextNode(""+(qtasCarAss)+": "));  

        let removerCasEsp = document.createElement("input");
        removerCasEsp.type = 'button';
        removerCasEsp.value = 'Remover';
        var tipo = "casosEsp";
        var lado = "md";
        removerCasEsp.setAttribute("onclick","removerNod("+(qtasCasEsp)+",\""+ lado + "\",\""+ tipo + "\")");  
        // removerCarAss.setAttribute("onclick","removerNod("+(qtosNodMd)+",\""+ lado + "\")");   // assim que se passa uma string como parâmetro numa função  



        if(caracte === 0){
            divCasEspMd.appendChild(document.createTextNode("Microcistos agrupados: "));         

            // como criar as labels
            var microCistMdlbl = document.createElement("label");
            microCistMdlbl.setAttribute("for","casEsp_md"+(qtasCasEsp));
            microCistMdlbl.innerHTML = "Localização: "
            divCasEspMd.appendChild(microCistMdlbl);
    
            // como criar os selects
            var microCistMdloc = document.createElement("select");
            microCistMdloc.setAttribute("onchange","");
            microCistMdloc.options[microCistMdloc.options.length] = new Option('QSL');
            microCistMdloc.options[microCistMdloc.options.length] = new Option('QSM');
            microCistMdloc.options[microCistMdloc.options.length] = new Option('QIL');
            microCistMdloc.options[microCistMdloc.options.length] = new Option('QIM');
            microCistMdloc.options[microCistMdloc.options.length] = new Option('UUQQSS');
            microCistMdloc.options[microCistMdloc.options.length] = new Option('UUQQLL');
            microCistMdloc.options[microCistMdloc.options.length] = new Option('UUQQII');
            microCistMdloc.options[microCistMdloc.options.length] = new Option('UUQQMM');
            microCistMdloc.id = "casEsp_MicroCisAgr_md"+(qtasCasEsp);   
            microCistMdloc.className = "casEsp_MicroCisAgr_md"     
            divCasEspMd.appendChild(microCistMdloc);            
         
            divCasEspMd.appendChild(removerCasEsp);  

            divCasEspMd.appendChild(document.createElement("br"));

        }
        if(caracte === 1){
            // divCasEspMd.appendChild(document.createTextNode("Prótese mamária íntegra"));   

            var ProtIntMdlbl = document.createElement("label");
            // ProtIntMdlbl.setAttribute("for","casEsp_md"+(qtasCasEsp));
            ProtIntMdlbl.innerHTML = "Prótese mamária íntegra"
            ProtIntMdlbl.className = "casEsp_ProtInt_Md"
            divCasEspMd.appendChild(ProtIntMdlbl);   
            divCasEspMd.appendChild(removerCasEsp);  
            divCasEspMd.appendChild(document.createElement("br"));

        }
        if(caracte === 2){
            
            
            var LinfIMMdlbl = document.createElement("label");
            // ProtIntMdlbl.setAttribute("for","casEsp_md"+(qtasCasEsp));
            LinfIMMdlbl.innerHTML = "Linfonodo intramamário:"
            LinfIMMdlbl.className = "casEsp_LinfIM_Md"
            divCasEspMd.appendChild(LinfIMMdlbl); 
            
            // como criar as labels
            let linImMdlbl = document.createElement("label");
            linImMdlbl.setAttribute("for","casEsp_linfImMd"+(qtasCasEsp));
            linImMdlbl.innerHTML = "Tamanho:"
            // linImMdlbl.className = "casEsp_linfImMd"
            divCasEspMd.appendChild(linImMdlbl);
    
            // criar o input medidas
            let linImMd = document.createElement("input"); 
            linImMd.id = "casEsp_linfImMd"+(qtasCasEsp); 
            linImMd.className = "casEsp_med_linfImMd"
            divCasEspMd.appendChild(linImMd); 
            
            let linImMdLoclbl = document.createElement("label");
            linImMdLoclbl.setAttribute("for","casEsp_md"+(qtasCasEsp));
            linImMdLoclbl.innerHTML = "Localização: "
            divCasEspMd.appendChild(linImMdLoclbl);

            let linImMdLocSel = document.createElement("select");
            linImMdLocSel.setAttribute("onchange","");
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('1/2 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('2/3 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('3/4 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('4/5 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('5/6 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('6/7 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('7/8 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('8/9 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('9/10 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('10/11 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('11/12 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('12/1 horas');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('Retroareolar');
            linImMdLocSel.options[linImMdLocSel.options.length] = new Option('Periareolar');
            linImMdLocSel.id = "casEsp_linImMdLocSel"+(qtasCasEsp)      
            linImMdLocSel.className = "casEsp_linImMdLocSel"
            divCasEspMd.appendChild(linImMdLocSel);


            
            divCasEspMd.appendChild(removerCasEsp);  

            divCasEspMd.appendChild(document.createElement("br"));

        }
           
        
        



    }
}
    
//////// MAMA ESQUERDA ////////////////

function criar_nodulos_me(){

    if(document.getElementById("nodulos_me").checked){

        let lado = "me";
        qtosNodMe++; 
        let container = document.getElementById("nodulos_me_desc");

        //criar uma div para cada nódulo
        let divNod = document.createElement('div');
        divNod.id = "nod_me_divId"+(qtosNodMe); 
        container.appendChild(divNod);

        //adicionar os nódulos à div de cada nódulo

        // divNod.appendChild(document.createTextNode("N"+(qtosNodMe)+": "));

        let numNod = document.createElement("label");
        // tipoLabl.setAttribute("for","nod_me_tipo"+(qtosNodMe));
        numNod.innerHTML = "N"+(qtosNodMe)+": ";
        numNod.id = "nod_me_numNodId"+(qtosNodMe); 
        numNod.className = "nod_me_numero"
        divNod.appendChild(numNod);
        
        // Tipo de nódulo

        // como criar as labels
        var tipoLabl = document.createElement("label");
        tipoLabl.setAttribute("for","nod_me_tipo"+(qtosNodMe));
        tipoLabl.innerHTML = "Tipo: "
        divNod.appendChild(tipoLabl);

        // como criar os selects
        var tipo = document.createElement("select");
        tipo.setAttribute("onchange","mudarDescritoresNod("+(qtosNodMe)+")");
        tipo.options[tipo.options.length] = new Option('Cisto simples');
        tipo.options[tipo.options.length] = new Option('Nódulo sólido');
        tipo.options[tipo.options.length] = new Option('Cisto espesso');
        tipo.options[tipo.options.length] = new Option('Cisto complexo');
        tipo.options[tipo.options.length] = new Option('Ilhota de gordura');
        tipo.id = "nod_me_tipo"+(qtosNodMe);  
        tipo.className = "nod_me_tipo"      
        divNod.appendChild(tipo);

        
        // Forma do nódulo
        // como criar as labels
        var formaLabl = document.createElement("label");
        formaLabl.setAttribute("for","nod_me_forma"+(qtosNodMe));
        formaLabl.innerHTML = "Forma: "
        divNod.appendChild(formaLabl);

        // como criar os selects
        var forma = document.createElement("select");
        forma.setAttribute("onchange","");
        forma.options[forma.options.length] = new Option('Oval');
        forma.options[forma.options.length] = new Option('Redondo');
        forma.options[forma.options.length] = new Option('Irregular');
        forma.id = "nod_me_forma"+(qtosNodMe); 
        forma.className  = "nod_me_forma"       
        divNod.appendChild(forma);


        // Margem do nódulo
        // como criar as labels
        var margemLabl = document.createElement("label");
        margemLabl.setAttribute("for","nod_me_margem"+(qtosNodMe));
        margemLabl.innerHTML = "Margem: "
        divNod.appendChild(margemLabl);

        // como criar os selects
        var margem = document.createElement("select");
        margem.setAttribute("onchange","");
        margem.options[margem.options.length] = new Option('Circunscrita');
        margem.options[margem.options.length] = new Option('Indistinta');
        margem.options[margem.options.length] = new Option('Angular');
        margem.options[margem.options.length] = new Option('Microlobulada');
        margem.options[margem.options.length] = new Option('Espiculada');
        margem.id = "nod_me_margem"+(qtosNodMe);  
        margem.className  = "nod_me_margem"      
        divNod.appendChild(margem);

        // Orientação
        // como criar as labels
        var orientacaoLabl = document.createElement("label");
        orientacaoLabl.setAttribute("for","nod_me_orientacao"+(qtosNodMe));
        orientacaoLabl.innerHTML = "Orientação: "
        divNod.appendChild(orientacaoLabl);

        // como criar os selects
        var orientacao = document.createElement("select");
        orientacao.setAttribute("onchange","");
        orientacao.options[orientacao.options.length] = new Option('Paralela');
        orientacao.options[orientacao.options.length] = new Option('Não paralela');
        orientacao.id = "nod_me_orientacao"+(qtosNodMe);
        orientacao.className  = "nod_me_orientacao"        
        divNod.appendChild(orientacao);

        // Ecogenicidade
        // como criar as labels
        var ecoLabl = document.createElement("label");
        ecoLabl.setAttribute("for","nod_me_eco"+(qtosNodMe));
        ecoLabl.innerHTML = "Eco: "
        divNod.appendChild(ecoLabl);

        // como criar os selects
        var eco = document.createElement("select");
        eco.setAttribute("onchange","");
        eco.options[eco.options.length] = new Option('Anecóico');
        eco.options[eco.options.length] = new Option('Hiperecóico');
        eco.options[eco.options.length] = new Option('Sólido-Cístico');
        eco.options[eco.options.length] = new Option('Hipoecóico');
        eco.options[eco.options.length] = new Option('Isoecóico');
        eco.options[eco.options.length] = new Option('Heterogêneo');
        eco.id = "nod_me_eco"+(qtosNodMe);  
        eco.className  = "nod_me_eco"      
        divNod.appendChild(eco);

        // Elementos posteriores
        // como criar as labels
        let posteriorLabl = document.createElement("label");
        posteriorLabl.setAttribute("for","nod_me_posterior"+(qtosNodMe));
        posteriorLabl.innerHTML = "Posterior: "
        divNod.appendChild(posteriorLabl);

        // como criar os selects
        var posterior = document.createElement("select");
        posterior.setAttribute("onchange","");
        posterior.options[posterior.options.length] = new Option('Ausente');
        posterior.options[posterior.options.length] = new Option('Reforço');
        posterior.options[posterior.options.length] = new Option('Sombra');
        posterior.options[posterior.options.length] = new Option('Misto');
        posterior.id = "nod_me_posterior"+(qtosNodMe); 
        posterior.className  = "nod_me_posterior"       
        divNod.appendChild(posterior);

        // Medidas
        // como criar as labels
        var medida = document.createElement("label");
        medida.setAttribute("for","nod_me_medida"+(qtosNodMe));
        medida.innerHTML = " Medidas: "
        divNod.appendChild(medida);

        // criar o input medidas
        var medida_nod_md = document.createElement("input"); 
        medida_nod_md.id = "medida_nod_me"+(qtosNodMe); 
        medida_nod_md.className  = "nod_me_medida" 
        medida_nod_md.size = "8";
        divNod.appendChild(medida_nod_md); 

        // Distância mamilo / pele
        // como criar as labels
        let distMamiloPelelbl = document.createElement("label");
        distMamiloPelelbl.setAttribute("for","nod_me_distMamiloPelelbl"+(qtosNodMe));
        distMamiloPelelbl.innerHTML = " Dist. mamilo/pele: "
        divNod.appendChild(distMamiloPelelbl);

        // criar o input medidas
        var distMamiloPele = document.createElement("input"); 
        distMamiloPele.id = "nod_me_distMaPe"+(qtosNodMe);  
        distMamiloPele.className  = "nod_me_distMaPe"
        distMamiloPele.size = "5";
        divNod.appendChild(distMamiloPele);

        // Localização
        // como criar as labels
        var localizacaoLabl = document.createElement("label");
        localizacaoLabl.setAttribute("for","nod_me_localizacao"+(qtosNodMe));
        localizacaoLabl.innerHTML = "Localização: "
        divNod.appendChild(localizacaoLabl);

        // como criar os selects
        var localizacao = document.createElement("select");
        localizacao.setAttribute("onchange","");
        localizacao.options[localizacao.options.length] = new Option('1/2 horas');
        localizacao.options[localizacao.options.length] = new Option('2/3 horas');
        localizacao.options[localizacao.options.length] = new Option('3/4 horas');
        localizacao.options[localizacao.options.length] = new Option('4/5 horas');
        localizacao.options[localizacao.options.length] = new Option('5/6 horas');
        localizacao.options[localizacao.options.length] = new Option('6/7 horas');
        localizacao.options[localizacao.options.length] = new Option('7/8 horas');
        localizacao.options[localizacao.options.length] = new Option('8/9 horas');
        localizacao.options[localizacao.options.length] = new Option('9/10 horas');
        localizacao.options[localizacao.options.length] = new Option('10/11 horas');
        localizacao.options[localizacao.options.length] = new Option('11/12 horas');
        localizacao.options[localizacao.options.length] = new Option('12/1 horas');
        localizacao.options[localizacao.options.length] = new Option('Retroareolar');
        localizacao.options[localizacao.options.length] = new Option('Periareolar');
        localizacao.id = "nod_me_localizacao"+(qtosNodMe);      
        localizacao.className  = "nod_me_localizacao"  
        divNod.appendChild(localizacao);

        // como criar as labels
        var marcarPAAF = document.createElement("input");
        marcarPAAF.type = 'checkbox';
        marcarPAAF.id = "nod_me_marcarPAAF"+(qtosNodMe);
        marcarPAAF.className  = "nod_me_marcarPAAF"
        // marcarPAAF.setAttribute("for","nod_me_marcarPAAF"+(qtosNodMe));
        divNod.appendChild(marcarPAAF);

        var marcarPAAFlbl = document.createElement("label");
        marcarPAAFlbl.setAttribute("for","nod_me_marcarPAAF"+(qtosNodMe));
        marcarPAAFlbl.innerHTML = 'PAAF?';
        divNod.appendChild(marcarPAAFlbl);

        // como criar as labels
        var marcarCore = document.createElement("input");
        marcarCore.type = 'checkbox';
        marcarCore.id = "nod_me_marcarCore"+(qtosNodMe);
        marcarCore.className  = "nod_me_marcarCore"
        // marcarCore.setAttribute("for","nod_me_marcarCore"+(qtosNodMe));
        divNod.appendChild(marcarCore);

        var marcarCorelbl = document.createElement("label");
        marcarCorelbl.setAttribute("for","nod_me_marcarCore"+(qtosNodMe));
        marcarCorelbl.innerHTML = 'Core?';
        divNod.appendChild(marcarCorelbl);
       
 
        // como criar as labels
        let removerNod = document.createElement("input");
        removerNod.type = 'button';
        removerNod.value = 'Remover';
        var tipo = "nod";
        removerNod.setAttribute("onclick","removerNod("+(qtosNodMe)+",\""+ lado + "\",\""+ tipo + "\")");   // assim que se passa uma string como parâmetro numa função           
        divNod.appendChild(removerNod);   
        
       

}
}

function calcificacoes_me(){
    if(document.getElementById("calcificacoes_me").checked){
        qtasCalcMe++;        
        var container = document.getElementById("calcificacoes_me_desc"); 
        
        //criar uma div para cada característica
        let divCalcMe = document.createElement('div');
        divCalcMe.id = "calc_me_divId"+(qtasCalcMe); 
        container.appendChild(divCalcMe);

        let numCalcMe = document.createElement("label");
        
        numCalcMe.innerHTML = ""+qtasCalcMe+": ";
        numCalcMe.id = "calc_me_numId"+(qtasCalcMe); 
        numCalcMe.className = "calc_me_numId";
        divCalcMe.appendChild(numCalcMe);

        // como criar as labels
        var calcMelbl = document.createElement("label");
        calcMelbl.setAttribute("for","calc_me_me"+(qtasCarAss));
        calcMelbl.innerHTML = "Área de calcificação no parênquima mamário: "
        divCalcMe.appendChild(calcMelbl);

        // como criar os selects
        var calcMelblSel = document.createElement("select");
        calcMelblSel.setAttribute("onchange","");
        calcMelblSel.options[calcMelblSel.options.length] = new Option('QSL');
        calcMelblSel.options[calcMelblSel.options.length] = new Option('QSM');
        calcMelblSel.options[calcMelblSel.options.length] = new Option('QIL');
        calcMelblSel.options[calcMelblSel.options.length] = new Option('QIM');
        calcMelblSel.options[calcMelblSel.options.length] = new Option('UUQQSS');
        calcMelblSel.options[calcMelblSel.options.length] = new Option('UUQQLL');
        calcMelblSel.options[calcMelblSel.options.length] = new Option('UUQQII');
        calcMelblSel.options[calcMelblSel.options.length] = new Option('UUQQMM');
        calcMelblSel.id = "calc_me"+(qtasCalcMe);        
        divCalcMe.appendChild(calcMelblSel);    
        
        
        let removerCalcMe = document.createElement("input");
        removerCalcMe.type = 'button';
        removerCalcMe.value = 'Remover';
        var tipo = "calc";
        var lado = "me";
        removerCalcMe.setAttribute("onclick","removerNod("+(qtasCalcMe)+",\""+ lado + "\",\""+ tipo + "\")");   // assim que se passa uma string como parâmetro numa função
        
        divCalcMe.appendChild(removerCalcMe);  

        divCalcMe.appendChild(document.createElement("br"));

    }

}

function caracteristicas_me(){
    if(document.getElementById("carAss_me").checked){

        qtasCarAssMe++
        // console.log(qtasCarAssMe)
        var caracte = document.getElementById("carAss_me_select").selectedIndex;
        var container = document.getElementById("carAss_me_desc"); 
        
        //criar uma div para cada característica
        let divCarMe = document.createElement('div');
        divCarMe.id = "carAss_me_divId"+(qtasCarAssMe); 
        container.appendChild(divCarMe);

        //adicionar os nódulos à div de cada nódulo      

        let numCarAss = document.createElement("label");
        
        numCarAss.innerHTML = ""+qtasCarAssMe+": ";
        numCarAss.id = "carAss_me_numId"+(qtasCarAssMe); 
        numCarAss.className = "carAss_me_numId"
        divCarMe.appendChild(numCarAss);

        // container.appendChild(document.createTextNode(""+(qtasCarAssMe)+": "));  

        let removerCarAss = document.createElement("input");
        removerCarAss.type = 'button';
        removerCarAss.value = 'Remover';
        var tipo = "carAss";
        var lado = "me";
        removerCarAss.setAttribute("onclick","removerNod("+(qtasCarAssMe)+",\""+ lado + "\",\""+ tipo + "\")");   // assim que se passa uma string como parâmetro numa função
        

        if(caracte === 0){
            divCarMe.appendChild(document.createTextNode("Distorção arquitetural: "));         

            // como criar as labels
            var formaLabl = document.createElement("label");
            formaLabl.setAttribute("for","carAss_me"+(qtasCarAssMe));
            formaLabl.innerHTML = "Localização: "
            divCarMe.appendChild(formaLabl);
    
            // como criar os selects
            var forma = document.createElement("select");
            forma.setAttribute("onchange","");
            forma.options[forma.options.length] = new Option('QSL');
            forma.options[forma.options.length] = new Option('QSM');
            forma.options[forma.options.length] = new Option('QIL');
            forma.options[forma.options.length] = new Option('QIM');
            forma.options[forma.options.length] = new Option('UUQQSS');
            forma.options[forma.options.length] = new Option('UUQQLL');
            forma.options[forma.options.length] = new Option('UUQQII');
            forma.options[forma.options.length] = new Option('UUQQMM');
            forma.id = "dist_arq_me"+(qtasCarAssMe);    
            forma.className =   "dist_arq_me"  
            divCarMe.appendChild(forma);            
         
            divCarMe.appendChild(removerCarAss);  

            divCarMe.appendChild(document.createElement("br"));

        }
        if(caracte === 1){
            divCarMe.appendChild(document.createTextNode("Ectasia ductal sem material"));  
            divCarMe.className =   "edsm_me"   
            divCarMe.appendChild(removerCarAss);  


            container.appendChild(document.createElement("br"));

        }
        if(caracte === 2){
            divCarMe.appendChild(document.createTextNode("Ectasia ductal com material: "));     
            
            // como criar as labels
            let ectDuctMat = document.createElement("label");
            ectDuctMat.setAttribute("for","carAss_me"+(qtasCarAssMe));
            ectDuctMat.innerHTML = "Tamanho:"
            divCarMe.appendChild(ectDuctMat);
    
            // criar o input medidas
            let MedectDuctMat = document.createElement("input"); 
            MedectDuctMat.id = "medida_MedectDuctMat"+(qtasCarAssMe);  
            MedectDuctMat.className = "medida_MedectDuctMat_me"
            divCarMe.appendChild(MedectDuctMat);    
            
            divCarMe.appendChild(removerCarAss);  

            divCarMe.appendChild(document.createElement("br"));

        }
        if(caracte === 3){
            divCarMe.appendChild(document.createTextNode("Espessamento da pele em: "));   
            
            // como criar os selects
            var espessamento_pele = document.createElement("select");
            espessamento_pele.setAttribute("onchange","");
            espessamento_pele.options[espessamento_pele.options.length] = new Option('QSL');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('QSM');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('QIL');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('QIM');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('UUQQSS');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('UUQQLL');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('UUQQII');
            espessamento_pele.options[espessamento_pele.options.length] = new Option('UUQQMM');
            espessamento_pele.id = "espessamento_pele_me"+(qtasCarAssMe);        
            espessamento_pele.className = "espessamento_pele_me";
            divCarMe.appendChild(espessamento_pele);

            divCarMe.appendChild(removerCarAss);  

            divCarMe.appendChild(document.createElement("br"));

        }
        if(caracte === 4){
            divCarMe.appendChild(document.createTextNode("Retração da pele em: "));   
            
            // como criar os selects
            var retracao_pele = document.createElement("select");
            retracao_pele.setAttribute("onchange","");
            retracao_pele.options[retracao_pele.options.length] = new Option('QSL');
            retracao_pele.options[retracao_pele.options.length] = new Option('QSM');
            retracao_pele.options[retracao_pele.options.length] = new Option('QIL');
            retracao_pele.options[retracao_pele.options.length] = new Option('QIM');
            retracao_pele.options[retracao_pele.options.length] = new Option('UUQQSS');
            retracao_pele.options[retracao_pele.options.length] = new Option('UUQQLL');
            retracao_pele.options[retracao_pele.options.length] = new Option('UUQQII');
            retracao_pele.options[retracao_pele.options.length] = new Option('UUQQMM');
            retracao_pele.id = "retracao_pele_me"+(qtasCarAssMe);  
            retracao_pele.className =   "retracao_pele_me";    
            divCarMe.appendChild(retracao_pele);

            divCarMe.appendChild(removerCarAss);  

            container.appendChild(document.createElement("br"));

        }

    }
}

function casosEspeciais_me(){
    if(document.getElementById("casEsp_me").checked){

        qtasCasEspMe++
        var caracte = document.getElementById("casEsp_me_select").selectedIndex;
        var container = document.getElementById("casosEsp_me_desc"); 
        
        //criar uma div para cada característica
        let divCasEspMe = document.createElement('div');
        divCasEspMe.id = "casosEsp_me_divId"+(qtasCasEspMe); 
        container.appendChild(divCasEspMe);

        //adicionar os nódulos à div de cada nódulo

        // divNod.appendChild(document.createTextNode("N"+(qtosNodMe)+": "));

        let numCasEspe = document.createElement("label");
        // tipoLabl.setAttribute("for","nod_me_tipo"+(qtosNodMe));
        numCasEspe.innerHTML = ""+qtasCasEspMe+": ";
        numCasEspe.id = "casEsp_me_numId"+(qtasCasEspMe); 
        numCasEspe.className = "casEsp_me_numId"
        divCasEspMe.appendChild(numCasEspe);

        // container.appendChild(document.createTextNode(""+(qtasCarAss)+": "));  

        let removerCasEsp = document.createElement("input");
        removerCasEsp.type = 'button';
        removerCasEsp.value = 'Remover';
        var tipo = "casosEsp";
        var lado = "me";
        removerCasEsp.setAttribute("onclick","removerNod("+(qtasCasEspMe)+",\""+ lado + "\",\""+ tipo + "\")");  
        // removerCarAss.setAttribute("onclick","removerNod("+(qtosNodMe)+",\""+ lado + "\")");   // assim que se passa uma string como parâmetro numa função  



        if(caracte === 0){
            divCasEspMe.appendChild(document.createTextNode("Microcistos agrupados: "));         

            // como criar as labels
            var microCistMelbl = document.createElement("label");
            microCistMelbl.setAttribute("for","casEsp_me"+(qtasCasEspMe));
            microCistMelbl.innerHTML = "Localização: "
            divCasEspMe.appendChild(microCistMelbl);
    
            // como criar os selects
            var microCistMeloc = document.createElement("select");
            microCistMeloc.setAttribute("onchange","");
            microCistMeloc.options[microCistMeloc.options.length] = new Option('QSL');
            microCistMeloc.options[microCistMeloc.options.length] = new Option('QSM');
            microCistMeloc.options[microCistMeloc.options.length] = new Option('QIL');
            microCistMeloc.options[microCistMeloc.options.length] = new Option('QIM');
            microCistMeloc.options[microCistMeloc.options.length] = new Option('UUQQSS');
            microCistMeloc.options[microCistMeloc.options.length] = new Option('UUQQLL');
            microCistMeloc.options[microCistMeloc.options.length] = new Option('UUQQII');
            microCistMeloc.options[microCistMeloc.options.length] = new Option('UUQQMM');
            microCistMeloc.id = "casEsp_MicroCisAgr_me"+(qtasCasEspMe);   
            microCistMeloc.className = "casEsp_MicroCisAgr_me"     
            divCasEspMe.appendChild(microCistMeloc);            
         
            divCasEspMe.appendChild(removerCasEsp);  

            divCasEspMe.appendChild(document.createElement("br"));

        }
        if(caracte === 1){
            // divCasEspMe.appendChild(document.createTextNode("Prótese mamária íntegra"));   

            var ProtIntMelbl = document.createElement("label");
            // ProtIntMelbl.setAttribute("for","casEsp_me"+(qtasCasEspMe));
            ProtIntMelbl.innerHTML = "Prótese mamária íntegra"
            ProtIntMelbl.className = "casEsp_ProtInt_me"
            divCasEspMe.appendChild(ProtIntMelbl);   
            divCasEspMe.appendChild(removerCasEsp);  
            divCasEspMe.appendChild(document.createElement("br"));

        }
        if(caracte === 2){
            
            
            var LinfIMMelbl = document.createElement("label");
            // ProtIntMelbl.setAttribute("for","casEsp_me"+(qtasCasEspMe));
            LinfIMMelbl.innerHTML = "Linfonodo intramamário:"
            LinfIMMelbl.className = "casEsp_LinfIM_me"
            divCasEspMe.appendChild(LinfIMMelbl); 
            
            // como criar as labels
            let linImMelbl = document.createElement("label");
            linImMelbl.setAttribute("for","casEsp_linfImMe"+(qtasCasEspMe));
            linImMelbl.innerHTML = "Tamanho:"
            // linImMelbl.className = "casEsp_linfImMe"
            divCasEspMe.appendChild(linImMelbl);
    
            // criar o input medidas
            let linImMe = document.createElement("input"); 
            linImMe.id = "casEsp_linfImMe"+(qtasCasEspMe); 
            linImMe.className = "casEsp_med_linfImMe"
            divCasEspMe.appendChild(linImMe); 
            
            let linImMeLoclbl = document.createElement("label");
            linImMeLoclbl.setAttribute("for","casEsp_me"+(qtasCasEspMe));
            linImMeLoclbl.innerHTML = "Localização: "
            divCasEspMe.appendChild(linImMeLoclbl);

            let linImMeLocSel = document.createElement("select");
            linImMeLocSel.setAttribute("onchange","");
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('1/2 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('2/3 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('3/4 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('4/5 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('5/6 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('6/7 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('7/8 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('8/9 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('9/10 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('10/11 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('11/12 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('12/1 horas');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('Retroareolar');
            linImMeLocSel.options[linImMeLocSel.options.length] = new Option('Periareolar');
            linImMeLocSel.id = "casEsp_linImMeLocSel"+(qtasCasEspMe)      
            linImMeLocSel.className = "casEsp_linImMeLocSel"
            divCasEspMe.appendChild(linImMeLocSel);


            divCasEspMe.appendChild(removerCasEsp);  

            divCasEspMe.appendChild(document.createElement("br"));

        }
           

    }
}





