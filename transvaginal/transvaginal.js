// adicionar cistos nos ovários igual aos miomas e usar a classificação de IOTA para descrição. usar modelo igual ao do laudo de tireóide
// https://drpixel.fcm.unicamp.br/conteudo/descricao-ultrassonografica-das-massas-anexiais-segundo-iota
// https://www.cetrus.com.br/assets/conteudo/uploads/artigo4554b6cdedbcc02.pdf
// https://www.iotagroup.org/iota-models-software/iota-simple-rules-and-srrisk-calculator-diagnose-ovarian-cancer
// https://www.iotagroup.org/sites/default/files/Timmerman_AJOG_2016_SRrisk.pdf

// adicionar a função remover aos miomas

let qtosMiomas = 0;
let alteracoes_exame = 0;
let MA_ovd = 0;
let MA_ove = 0;
let laudo_para_copiar;

 // Quill JS

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



function volume(){

    // falta fazer 2 medidas e trocar vírgula por ponto
    var texto = document.getElementById("laudo").value;
    var regex = /\d+\.\d+/gi;
    var qtos = 0;
    var match = regex.exec(texto);
    var nums = [];
    while (match !== null){
        ++qtos;
        nums.push(match)
        match = regex.exec(texto);        
    }
    // let num1 = parseFloat(nums[0]);
    // let num2 = parseFloat(nums[1]);
    // let num3 = parseFloat(nums[2]);    
    // let volume = (num1*num2*num3*0.523).toFixed(1);//arredodar para uma casa decimal    
    // console.log(volume.toString());
    // console.log(qtos);

    //loop para poder calcular o volume em qualquer lugar do texto
    for (i=0;i<qtos;i++){
        let num1 = parseFloat(nums[i]);
        let num2 = parseFloat(nums[i+1]);
        let num3 = parseFloat(nums[i+2]);    
        let volume = (num1*num2*num3*0.523).toFixed(1);//arredodar para uma casa decimal    
        // console.log(volume.toString());
        texto = texto.replace(nums[i]+" "+nums[i+1]+" "+nums[i+2]+" ",nums[i]+" x "+nums[i+1]+" x "+nums[i+2]+" cm. Volume: "+volume.toString()+" cm³.")

    }
    
    document.getElementById("laudo").value = texto;

}

function copiar_laudo(){


    // editor.root.innerHTML = laudo_para_copiar;
    var xxx = editor.root.innerHTML
    xxx = xxx.replace(/<strong>/gm, '<b>');
    xxx = xxx.replace(/<\/strong>/gm, '</b>');
    

    CopyToClipboard('laudo_texto')
}

function apagar_laudo(){
   
    document.getElementById("laudo").value = '';
    
}

function criar_miomas(){  

    if(document.getElementById("miomas").checked){
        qtosMiomas++;
        let NumNod = qtosMiomas;
    
        let container = document.getElementById("miomas_desc");
    
    
        //criar uma div para cada mioma
        let divNod = document.createElement('div');
        divNod.id = "mioma_divId"+NumNod;
        divNod.className = "mioma_divId"
        container.appendChild(divNod);
    
        let numNod = document.createElement("label");
        
        numNod.innerHTML = "M"+(NumNod)+": ";
        numNod.id = "mioma_numMiomaId"+(NumNod); 
        numNod.className = "mioma_numMiomaId"
        divNod.appendChild(numNod);
    
        // divNod.appendChild(document.createTextNode("N"+(NumNod)+": "));
    
        // como criar as labels
        var paredeLlb = document.createElement("label");
        paredeLlb.setAttribute("for","mioma_parede"+(NumNod));
        paredeLlb.innerHTML = "Parede:"
        paredeLlb.className = "mioma_parede"
        divNod.appendChild(paredeLlb);
        
       
        // como criar os selects
        var parede = document.createElement("select");
        parede.options[parede.options.length] = new Option('Anterior');
        parede.options[parede.options.length] = new Option('Posterior');
        parede.options[parede.options.length] = new Option('Lateral esquerda');
        parede.options[parede.options.length] = new Option('Lateral direita');
        parede.id = "mioma_parede"+(NumNod);
        parede.className = "mioma_parede"
        
        divNod.appendChild(parede);
    
        // como criar as labels
        var tipoLbl = document.createElement("label");
        tipoLbl.setAttribute("for","mioma_tipo"+(NumNod));
        tipoLbl.innerHTML = "Tipo:"
        tipoLbl.className = "mioma_tipo"
        divNod.appendChild(tipoLbl);
        
        
        // como criar os selects
        var tipo = document.createElement("select");
        tipo.options[tipo.options.length] = new Option('Intramural');
        tipo.options[tipo.options.length] = new Option('Intramural/Subseroso');
        tipo.options[tipo.options.length] = new Option('Intramural/Submucoso');
        tipo.options[tipo.options.length] = new Option('Submucoso');
        tipo.options[tipo.options.length] = new Option('Subseroso');
        tipo.id = "mioma_tipo"+(NumNod);
        tipo.className = "mioma_tipo"
        
        divNod.appendChild(tipo);
    
        // como criar as labels
        var medidasLbl = document.createElement("label");
        medidasLbl.setAttribute("for","mioma_medidas"+(NumNod));
        medidasLbl.innerHTML = "Medidas:"
        medidasLbl.className = "mioma_medidas"
        divNod.appendChild(medidasLbl);
    
        // criar o input medidas
        var medida_mioma = document.createElement("input"); 
        medida_mioma.id = "medida_mioma"+(NumNod);  
        medida_mioma.size = "8"
        medida_mioma.className = "medida_mioma"
        divNod.appendChild(medida_mioma); 

    }


}

function massas_anexiais_ovd(){
    if(document.getElementById("massas_anexiais_ovd").checked){
        MA_ovd++
        massas_anexiais("ovd",MA_ovd)
    }

}

function massas_anexiais_ove(){
    if(document.getElementById("massas_anexiais_ove").checked){
        MA_ove++
        massas_anexiais("ove",MA_ove)
    }
    
}

function massas_anexiais(lado,NumNod){


    let container = document.getElementById("massas_anexiais_"+lado+"_desc");

 
    //criar uma div para cada nódulo
    let divNod = document.createElement('div');
    divNod.id = "nod_"+lado+"_divId"+(NumNod);
    divNod.className = "nod_"+lado+"_divId"
    container.appendChild(divNod);

    let numNod = document.createElement("label");
    
    numNod.innerHTML = "N"+(NumNod)+": ";
    numNod.id = "nod_"+lado+"_numNodId"+(NumNod); 
    numNod.className = "nod_"+lado+"_numero"
    divNod.appendChild(numNod);

    // como criar as labels
    var classificacaoLabel = document.createElement("label");
    classificacaoLabel.setAttribute("for","nod_"+lado+"_classificacao"+(NumNod));
    classificacaoLabel.innerHTML = "Classificação:"
    classificacaoLabel.className = "nod_"+lado+"_classificacao"
    divNod.appendChild(classificacaoLabel);
    
    // como criar os selects
    var classificacao = document.createElement("select");
    // classificacao.setAttribute("onchange","tirads('ld',"+qtos_nod+")"); o problema tá aqui tem que arrumar um jeito de passar para a fun~cao tirads 'ld' em vez de ld
    // classificacao.setAttribute("onchange","tirads(\""+ lado + "\")");
    classificacao.options[classificacao.options.length] = new Option('unilocular');
    classificacao.options[classificacao.options.length] = new Option('multilocular');
    classificacao.options[classificacao.options.length] = new Option('unilocular-sólida');
    classificacao.options[classificacao.options.length] = new Option('multilocular-sólida');
    classificacao.options[classificacao.options.length] = new Option('sólida');
    classificacao.options[classificacao.options.length] = new Option('Não classificável');
    classificacao.id = "nod_"+lado+"_classificacao"+(NumNod);
    classificacao.className = "nod_"+lado+"_classificacao"
    
    divNod.appendChild(classificacao);

    // como criar as labels
    var conteudoLabel = document.createElement("label");
    conteudoLabel.setAttribute("for","nod_"+lado+"_conteudo"+(NumNod));
    conteudoLabel.innerHTML = "Conteúdo:"
    conteudoLabel.className = "nod_"+lado+"_conteudo"
    divNod.appendChild(conteudoLabel);
    
    // como criar os selects
    var conteudo = document.createElement("select");
    // conteudo.setAttribute("onchange","tirads('ld',"+qtos_nod+")"); o problema tá aqui tem que arrumar um jeito de passar para a fun~cao tirads 'ld' em vez de ld
    // conteudo.setAttribute("onchange","tirads(\""+ lado + "\")");
    conteudo.options[conteudo.options.length] = new Option('anecóico');
    conteudo.options[conteudo.options.length] = new Option('com baixa ecogenicidade');
    conteudo.options[conteudo.options.length] = new Option('hemorrágico');
    conteudo.options[conteudo.options.length] = new Option('vidro-fosco');
    conteudo.options[conteudo.options.length] = new Option('misto');
    conteudo.id = "nod_"+lado+"_conteudo"+(NumNod);
    conteudo.className = "nod_"+lado+"_conteudo"
    
    divNod.appendChild(conteudo);

    // como criar as labels
    var contornosLabel = document.createElement("label");
    contornosLabel.setAttribute("for","nod_"+lado+"_contornos"+(NumNod));
    contornosLabel.innerHTML = "Contornos:"
    contornosLabel.className = "nod_"+lado+"_contornos"
    divNod.appendChild(contornosLabel);
    
    // como criar os selects
    var contornos = document.createElement("select");
    // contornos.setAttribute("onchange","tirads('ld',"+qtos_nod+")"); o problema tá aqui tem que arrumar um jeito de passar para a fun~cao tirads 'ld' em vez de ld
    // contornos.setAttribute("onchange","tirads(\""+ lado + "\")");
    contornos.options[contornos.options.length] = new Option('parede lisa');
    contornos.options[contornos.options.length] = new Option('parede irregular');
    contornos.options[contornos.options.length] = new Option('irregular');
    contornos.id = "nod_"+lado+"_contornos"+(NumNod);
    contornos.className = "nod_"+lado+"_contornos"
    
    divNod.appendChild(contornos);

    // como criar as labels
    var vascularizacaoLabel = document.createElement("label");
    vascularizacaoLabel.setAttribute("for","nod_"+lado+"_vascularizacao"+(NumNod));
    vascularizacaoLabel.innerHTML = "Vascularização:"
    vascularizacaoLabel.className = "nod_"+lado+"_vascularizacao"
    divNod.appendChild(vascularizacaoLabel);
    
    // como criar os selects
    var vascularizacao = document.createElement("select");
    // vascularizacao.setAttribute("onchange","tirads('ld',"+qtos_nod+")"); o problema tá aqui tem que arrumar um jeito de passar para a fun~cao tirads 'ld' em vez de ld
    // vascularizacao.setAttribute("onchange","tirads(\""+ lado + "\")");
    vascularizacao.options[vascularizacao.options.length] = new Option('Exame sem Doppler');
    vascularizacao.options[vascularizacao.options.length] = new Option('Sem fluxo');
    vascularizacao.options[vascularizacao.options.length] = new Option('Fluxo mínimo');
    vascularizacao.options[vascularizacao.options.length] = new Option('Fluxo moderado');
    vascularizacao.options[vascularizacao.options.length] = new Option('Fluxo intenso');
    vascularizacao.id = "nod_"+lado+"_vascularizacao"+(NumNod);
    vascularizacao.className = "nod_"+lado+"_vascularizacao"
    
    divNod.appendChild(vascularizacao);

    // como criar as labels
    var asciteLabel = document.createElement("label");
    asciteLabel.setAttribute("for","nod_"+lado+"_ascite"+(NumNod));
    asciteLabel.innerHTML = "Ascite:"
    asciteLabel.className = "nod_"+lado+"_ascite"
    divNod.appendChild(asciteLabel);
    
    // como criar os selects
    var ascite = document.createElement("select");
    // ascite.setAttribute("onchange","tirads('ld',"+qtos_nod+")"); o problema tá aqui tem que arrumar um jeito de passar para a fun~cao tirads 'ld' em vez de ld
    // ascite.setAttribute("onchange","tirads(\""+ lado + "\")");
    ascite.options[ascite.options.length] = new Option('sem ascite');
    ascite.options[ascite.options.length] = new Option('com ascite');
    ascite.id = "nod_"+lado+"_ascite"+(NumNod);
    ascite.className = "nod_"+lado+"_ascite"
    
    divNod.appendChild(ascite);
    
    // como criar as labels
    var medida = document.createElement("label");
    medida.setAttribute("for","nod_"+lado+"_medida"+(NumNod));
    medida.innerHTML = " Medidas: "
    divNod.appendChild(medida);

    // criar o input medidas
    var medida_nod_lado = document.createElement("input"); 
    medida_nod_lado.id = "medida_nod_"+lado+""+(NumNod);  
    medida_nod_lado.size = "8"
    medida_nod_lado.className = "medida_nod_"+lado;
    divNod.appendChild(medida_nod_lado); 

    // como criar as labels
    let removerNod = document.createElement("input");
    removerNod.type = 'button';
    removerNod.value = 'Remover';
    removerNod.id = "nod_"+lado+"_remover"+(NumNod); 
    removerNod.className = "nod_"+lado+"_remover";
    removerNod.setAttribute("onclick","removerNod("+(NumNod)+",\""+ lado + "\")");   // assim que se passa uma string como parâmetro numa função           
    divNod.appendChild(removerNod); 


    divNod.appendChild(document.createElement("br")); 
}

function removerNod(NumNod,lado){
    let element = document.getElementById("nod_"+lado+"_divId"+NumNod);
    element.parentNode.removeChild(element);

    if(lado === "ovd"){
        MA_ovd--;      

        // console.log(nodLd)  

        // [id^='someId'] will match all ids starting with someId.

        // [id$='someId'] will match all ids ending with someId.

        // [id*='someId'] will match all ids containing someId.

        // FUNCIONA COMO ATUALIZAR OS IDs DE TODOS OS COMPONENTES DO NÓDULO
        var divIdNod = document.querySelectorAll("[id*='nod_ovd_divId']");        
        var tamanho_divIdNod = divIdNod.length
        for (b=0;b<tamanho_divIdNod;b++){
            var id_elemento = divIdNod[b].id;
            var novo_id = id_elemento.substring(0,id_elemento.length-1);
            divIdNod[b].id = novo_id+(b+1);
            var divIdNod_elementos = document.getElementById("nod_ovd_divId"+(b+1)).querySelectorAll(".nod_ovd_numero,.nod_ovd_classificacao,.nod_ovd_conteudo,.nod_ovd_contornos,.nod_ovd_vascularizacao,.nod_ovd_ascite,.medida_nod_ovd,.nod_ovd_remover")
            var tamanho_divIdNod_elementos = divIdNod_elementos.length
            for(q=0;q<tamanho_divIdNod_elementos;q++){
                var id_elemento = divIdNod_elementos[q].id;
                var novo_id = id_elemento.substring(0,id_elemento.length-1);
                
                divIdNod_elementos[q].id = novo_id+(b+1);

                
                document.getElementById("nod_ovd_numNodId"+(b+1)).innerHTML = "N"+(b+1)+": "
                

            }
            document.getElementById("nod_ovd_remover"+(b+1)).setAttribute("onclick","removerNod("+(b+1)+",\""+ lado + "\")"); 


            
        }
    }
    if(lado === "ove"){
        MA_ove--;      

        // console.log(nodLd)  

        // [id^='someId'] will match all ids starting with someId.

        // [id$='someId'] will match all ids ending with someId.

        // [id*='someId'] will match all ids containing someId.

        // FUNCIONA COMO ATUALIZAR OS IDs DE TODOS OS COMPONENTES DO NÓDULO
        var divIdNod = document.querySelectorAll("[id*='nod_ove_divId']");        
        var tamanho_divIdNod = divIdNod.length
        for (b=0;b<tamanho_divIdNod;b++){
            var id_elemento = divIdNod[b].id;
            var novo_id = id_elemento.substring(0,id_elemento.length-1);
            divIdNod[b].id = novo_id+(b+1);
            var divIdNod_elementos = document.getElementById("nod_ove_divId"+(b+1)).querySelectorAll(".nod_ove_numero,.nod_ove_classificacao,.nod_ove_conteudo,.nod_ove_contornos,.nod_ove_vascularizacao,.nod_ove_ascite,.medida_nod_ove,.nod_ove_remover")
            var tamanho_divIdNod_elementos = divIdNod_elementos.length
            for(q=0;q<tamanho_divIdNod_elementos;q++){
                var id_elemento = divIdNod_elementos[q].id;
                var novo_id = id_elemento.substring(0,id_elemento.length-1);
                
                divIdNod_elementos[q].id = novo_id+(b+1);

                
                document.getElementById("nod_ove_numNodId"+(b+1)).innerHTML = "N"+(b+1)+": "
                

            }
            document.getElementById("nod_ove_remover"+(b+1)).setAttribute("onclick","remsoverNod("+(b+1)+",\""+ lado + "\")"); 


            
        }
    }

}

function calcularVolume(medidas){
    let totalMedidas = medidas.split(" ");
    totalMedidas.sort(function(a, b){return b-a;});//em ordem decrescente.  
    if(totalMedidas.length === 3){
        let x1 = parseFloat(totalMedidas[0]);
        let x2 = parseFloat(totalMedidas[1]);
        let x3 = parseFloat(totalMedidas[2]);          
        let volume = parseFloat(x1*x2*x3*0.523).toFixed(2);    
        return x1.toString()+" x "+x2.toString()+" x "+x3.toString()+" cm, com volume aproximado de "+volume.toString()+" cm³"

    }
    if(totalMedidas.length === 2){
        let x1 = totalMedidas[0];
        let x2 = totalMedidas[1];
        return x1.toString()+" x "+x2.toString()+" cm"
    }
    if(totalMedidas.length === 1){
        let x1 = totalMedidas[0];        
        return x1.toString()+" cm"
    }
    // if(totalMedidas.length === 0){
    //     let x1 = totalMedidas[0];        
    //     return ""
    // }



}

function diuDist(distDiu){
    let diu_dist = distDiu.split(" ");
    if(diu_dist.length === 2){
        let diu_dist_fundo = diu_dist[0]
        let diu_dist_oci = diu_dist[1]
        return " distando "+diu_dist_fundo+" cm do fundo da cavidade uterina e "+diu_dist_oci+" cm do OCI"
    }
    if(diu_dist.length === 1){
        
        let diu_dist_oci = diu_dist[0]
        return " distando "+diu_dist_oci+" cm do OCI"
    }
    if(diu_dist.length === 0){       
        
        return ""
    }   

}

function TextoMassasAnexiais(lado,NumM){
    let classificacao = document.getElementById("nod_"+lado+"_classificacao"+NumM).options[document.getElementById("nod_"+lado+"_classificacao"+NumM).selectedIndex].text;
    let conteudo = document.getElementById("nod_"+lado+"_conteudo"+NumM).options[document.getElementById("nod_"+lado+"_conteudo"+NumM).selectedIndex].text;
    let contornos = document.getElementById("nod_"+lado+"_contornos"+NumM).options[document.getElementById("nod_"+lado+"_contornos"+NumM).selectedIndex].text;
    let vascularizacao = document.getElementById("nod_"+lado+"_vascularizacao"+NumM).options[document.getElementById("nod_"+lado+"_vascularizacao"+NumM).selectedIndex].text;
    let ascite = document.getElementById("nod_"+lado+"_ascite"+NumM).options[document.getElementById("nod_"+lado+"_ascite"+NumM).selectedIndex].text;
    let medidas = calcularVolume(document.getElementById("medida_nod_"+lado+NumM+"").value);

    if(vascularizacao === "Exame sem Doppler"){
        return "N"+NumM+": Imagem nodular "+classificacao+", de conteúdo "+conteudo+", com "+contornos+", "+ascite+", medindo "+medidas+"" 
    }else{
        return "N"+NumM+": Imagem nodular "+classificacao+", de conteúdo "+conteudo+", com "+contornos+", "+vascularizacao+" ao Doppler, "+ascite+", medindo "+medidas+"" 
    }

    
}



function gerar_laudo_transvaginal(){

    // essa aqui é uma nested function dentro da função gerar laudo
    function TextoAlteracoes(lado,alt,lado2){ //  "+lado+"    

    if(alt === "ausente"){

        return [laudo_tv = laudo_tv.replace("- Ovário "+lado+" de dimensões normais e contornos regulares.","- Ovário "+lado+" não visualizado. Relato de cirurgia prévia. Ausência de massas ou coleções em sua topografia.")]

    }
    if(alt === "nvig"){

        return [laudo_tv = laudo_tv.replace("- Ovário "+lado+" de dimensões normais e contornos regulares.","- Ovário "+lado+" não visualizado devido interposição gasosa. Ausência de massas ou coleções em sua topografia.")]


    }    
    if(alt === "cisfol"){ //"+lado+"

        let cisfol = calcularVolume(document.getElementById("dimensoes_"+lado2+"_cistoFolicular").value)
        return [laudo_tv = laudo_tv.replace("{alt_"+lado2+"}","No interior do ovário "+lado+" encontra-se cisto com conteúdo anecóico, sem septos e de contornos regulares, medindo "+cisfol+", sugestivo de cisto de natureza folicular.\n<br>{alt_"+lado2+"}"),
        laudo_tv = laudo_tv.replace("{diag}","- Cisto em ovário "+lado+" de provável natureza folicular, acima descrito.<p>\n{diag}</p>")]

    }
    if(alt === "cishem"){ 

    let cishem = calcularVolume(document.getElementById("dimensoes_"+lado2+"_cistoHemorragico").value)

    return [laudo_tv = laudo_tv.replace("{alt_"+lado2+"}","No interior do ovário "+lado+" encontra-se cisto com conteúdo hipoecóico e heterogêneo, com ecos em suspensão e traves ecogênicas em permeio, medindo "+cishem+".\n<br>{alt_"+lado2+"}"),
    laudo_tv = laudo_tv.replace("{diag}","- Cisto em ovário "+lado+" que pode corresponder a cisto hemorrágico ou endometrioma. Sugere-se realizar controle ecográfico.<p>\n{diag}</p>")]


    }
    if(alt === "policis"){ 

        return [laudo_tv = laudo_tv.replace("{alt_"+lado2+"}","Ovário "+lado+" de aspecto micropolicístico.\n<br>{alt_"+lado2+"}"),
        laudo_tv = laudo_tv.replace("{diag}","- Ovário "+lado+" de aspecto micropolicístico.<p>\n{diag}</p>")]
    }

    if(alt === "teratoma"){ 

        let teratoma = calcularVolume(document.getElementById("dimensoes_"+lado2+"_Teratoma").value)

        return [laudo_tv = laudo_tv.replace("{alt_"+lado2+"}","No interior do ovário "+lado+" encontra-se imagem heterogênea, com conteúdo de aspecto ecográfico semelhante à gordura, com linhas ecogênicas em seu interior e focos de calcificação, medindo "+teratoma+".\n<br>{alt_"+lado2+"}"),
        laudo_tv = laudo_tv.replace("{diag}","- Cisto em ovário "+lado+" acima descrito, cuja a principal hipótese diagnóstica é de Teratoma Ovariano. À critério clínico, realizar RM de Pelve.<p>\n{diag}</p>")]
    }



}
    //no sitema desse jeito já fica ótimo. arrumar um jeito de no quill tb ficar legal.

    var laudo_tv = `<p><b>ULTRASSONOGRAFIA TRANSVAGINAL</b></p><br>
<p><b>TÉCNICA:</b>{tipo}</p><br>
<p><b>Indicação clínica:</b> {ind_cli}</p><br>
<p><b>LAUDO:</b></p><br>
<p>- Útero em {ut_posi_texto}, de dimensões normais e contornos regulares.{adenomiose}
Medidas uterinas: {medidas_utero}
{miomas}<br></p>
<p>- Endométrio fino e regular, {esp_end}<br>
{diu}<br></p>
<p>- Ovário direito de dimensões normais e contornos regulares. Medidas do ovário: {med_ovd}<br>
{alt_ovd}<br></p>
<p>- Ovário esquerdo de dimensões normais e contornos regulares. Medidas do ovário: {med_ove}<br>
{alt_ove}</p>
<p><b>IMPRESSÃO DIAGNÓSTICA:</b><br>
{diag}</p>

`

// var laudo_tv = `<p><b>ULTRASSONOGRAFIA TRANSVAGINAL</b></p>

// <p><b>TÉCNICA:</b> Exame realizado por via transvaginal com transdutor endocavitário.</p>

// <p><b>Indicação clínica:</b> {ind_cli}</p>

// <p><b>LAUDO:</b></p>

// <p>- Útero em {ut_posi_texto}, de dimensões normais e contornos regulares.{adenomiose}<p>
// <p>{miomas}</p>
// <p>Medidas uterinas: {medidas_utero}</p>
// <p>- Endométrio fino e regular, {esp_end}</p>
// <p>{diu}</p>
// <p>- Ovário direito de dimensões normais e contornos regulares. Medidas do ovário: {med_ovd}</p>
// <p>{alt_ovd}</p>
// <p>- Ovário esquerdo de dimensões normais e contornos regulares. Medidas do ovário: {med_ove}</p>
// <p>{alt_ove}</p>
// <p><b>IMPRESSÃO DIAGNÓSTICA:</b></p>
// <p>{diag}</p>

// `


    let tipoExame = document.getElementById("tipo_exame").selectedIndex;
    if(tipoExame === 1 || tipoExame === 2 ){
        laudo_tv = laudo_tv.replace("{tipo}"," Exame realizado por via abdominal com transdutor convexo.")
    }
    if(tipoExame === 0){
        laudo_tv = laudo_tv.replace("{tipo}"," Exame realizado por via transvaginal com transdutor endocavitário.")
    }


    let indicacao = document.getElementById("indicacao").value;
    if(indicacao == null || indicacao == ""){
        laudo_tv = laudo_tv.replace("{ind_cli}","Avaliação clínica.");
    }else{
        laudo_tv = laudo_tv.replace("{ind_cli}",indicacao);
    }

    //útero posição

    var ut_posi = document.getElementById("utero_avf");
    var ut_posi_texto = ut_posi.options[ut_posi.selectedIndex].text;

    let medidas_utero = document.getElementById("medidas_utero").value;
    if(medidas_utero == null || medidas_utero == ""){
        laudo_tv = laudo_tv.replace("Medidas uterinas: {medidas_utero}","");
    }else{
        let medidas_utero2 = calcularVolume(medidas_utero);
        laudo_tv = laudo_tv.replace("{medidas_utero}",medidas_utero2)
    }

    
    laudo_tv = laudo_tv.replace("{ut_posi_texto}",ut_posi_texto)
    
    if (document.getElementById("utero_ausente").checked){
        alteracoes_exame++
        laudo_tv = laudo_tv.replace("- Útero em AVF, de dimensões normais e contornos regulares.{adenomiose}","- Útero ausente. Relato de cirurgia prévia. Ausência de massas ou coleções em sua topografia.");
        laudo_tv = laudo_tv.replace("- Útero em RVF, de dimensões normais e contornos regulares.{adenomiose}","- Útero ausente. Relato de cirurgia prévia. Ausência de massas ou coleções em sua topografia.");
        laudo_tv = laudo_tv.replace("Medidas uterinas: {medidas_utero}","");
        laudo_tv = laudo_tv.replace("Medidas uterinas:  cm","");
        
        laudo_tv = laudo_tv.replace("- Endométrio fino e regular, {esp_end}","");
        laudo_tv = laudo_tv.replace("{diag}","- Status pós histerectomia total.<p>\n{diag}</p>");
    }
    if (document.getElementById("adenomiose").checked){    
        alteracoes_exame++       
        laudo_tv = laudo_tv.replace("{adenomiose}"," Presença de imagens císticas em permeio ao tecido miometrial, associadas a espessura miometrial assimétrica (à custa, principalmente de parede posterior) e estrias miometriais hipoecóicas, que causam faixas de sombras acústicas paralelas.");        
        laudo_tv = laudo_tv.replace("{diag}","- Sinais ecográficos sugestivos de adenomiose.<p>\n{diag}</p>");
    }

    //miomas
    if (document.getElementById("miomas").checked){   
        alteracoes_exame++     

        laudo_tv = laudo_tv.replace("{adenomiose}","");

        // mioma único
        if(qtosMiomas == 1){
            
            var mioma_parede = document.getElementById("mioma_parede1");
            var mioma_parede_texto = mioma_parede.options[mioma_parede.selectedIndex].text;
            var mioma_tipo = document.getElementById("mioma_tipo1");
            var mioma_tipo_texto = mioma_tipo.options[mioma_tipo.selectedIndex].text;
            var mioma_medidas_texto = document.getElementById("medida_mioma1").value;
            let volumeMioma = calcularVolume(mioma_medidas_texto);
            laudo_tv = laudo_tv.replace("{miomas}","- Ecotextura miometrial heterogênea à custa de <b>nódulo miometrial em parede "+mioma_parede_texto+", "+mioma_tipo_texto+", medindo "+volumeMioma+"</b>");
            laudo_tv = laudo_tv.replace("{diag}","- Nódulo miometrial sugestivo de mioma.<p>\n{diag}</p>");
        }
        // miomas múltiplos
        if(qtosMiomas > 1){
            laudo_tv = laudo_tv.replace("{miomas}","<p>- Ecotextura miometrial heterogênea à custa de múltiplos nódulos miometriais, os maiores assim descritos:</p>proximo_mioma");
            laudo_tv = laudo_tv.replace("{diag}","- Nódulos miometriais sugestivos de miomas.<p>\n{diag}</p>");
            for(i=1;i<=qtosMiomas;i++){
                var mioma_parede = document.getElementById("mioma_parede"+(i));
                var mioma_parede_texto = mioma_parede.options[mioma_parede.selectedIndex].text;
                var mioma_tipo = document.getElementById("mioma_tipo"+(i));
                var mioma_tipo_texto = mioma_tipo.options[mioma_tipo.selectedIndex].text;
                var mioma_medidas_texto = document.getElementById("medida_mioma"+(i)).value;
                let volumeMioma = calcularVolume(mioma_medidas_texto);
                laudo_tv = laudo_tv.replace("proximo_mioma","<p><b>M"+i+":</b> em parede "+mioma_parede_texto+", "+mioma_tipo_texto+", medindo "+volumeMioma+"</p>\nproximo_mioma");
                

            }
            

        }        
       
    }


    // endométrio
    let endometrio = document.getElementById("espessura_endometrio").value;
    if(endometrio == null || endometrio == ""){
        laudo_tv = laudo_tv.replace(", {esp_end}",".");
    }else{
        laudo_tv = laudo_tv.replace("{esp_end}",endometrio+" cm.");
    }

    // laudo_tv = laudo_tv.replace("{esp_end}","com espessura de"+document.getElementById("espessura_endometrio").value+" cm.");
    

  
    if(document.getElementById("polipo_endometrio").checked){
        alteracoes_exame++
        laudo_tv = laudo_tv.replace("- Endométrio fino e regular,","- No interior da cavidade uterina encontra-se imagem hipoecóica, de contornos regulares, medindo "+document.getElementById("dimensoes_polipo_endometrio").value+" cm. Endométrio"); 
        laudo_tv = laudo_tv.replace("{diag}","- Sinais ecográficos da presença de pólipo endometrial. Sugere-se realizar controle ecográfico.<p>\n{diag}</p>"); 
        

    }
    if(document.getElementById("end_esp").checked){ 
        alteracoes_exame++      
        laudo_tv = laudo_tv.replace("{diag}","- Endométrio espessado para a faixa etária. Sugere-se realizar controle ecográfico.<p>\n{diag}</p>"); 
        laudo_tv = laudo_tv.replace("Endométrio fino e regular","Endométrio espessado para a faixa etária");        

    }

    // diu

    if(document.getElementById("diu").checked){
        alteracoes_exame++
        let rb_diu = document.getElementsByName("diu_posicao");
        for (let index = 0; index < rb_diu.length; index++) {
            if(rb_diu[0].checked){
                laudo_tv = laudo_tv.replace("{diag}","- DIU normoposicionado no interior da cavidade uterina.<p>\n{diag}</p>");
                let diu_dist = diuDist(document.getElementById("diu_normo_dist").value);
                laudo_tv = laudo_tv.replace("{diu}","DIU normoposicionado no interior da cavidade uterina"+diu_dist+".");

            }
            if(rb_diu[1].checked){
                laudo_tv = laudo_tv.replace("{diag}","- DIU deslocado do fundo da cavidade uterina, acima descrito.<p>\n{diag}</p>");
                let diu_dist = diuDist(document.getElementById("diu_desl_dist").value);
                laudo_tv = laudo_tv.replace("{diu}","DIU deslocado do fundo da cavidade uterina"+diu_dist+".");

            }
            
        }
    }

    // ovário direito

    // medidas

    let ovd = document.getElementById("medidas_ovd").value;
    if(ovd == null || ovd == ""){
        laudo_tv = laudo_tv.replace("Medidas do ovário: {med_ovd}","");
    }else{
        let ovd_med = calcularVolume(ovd);
        laudo_tv = laudo_tv.replace("{med_ovd}",ovd_med)
    }

    
    // console.log("ovd: "+ ovd_med)


    if(document.getElementById("ovd_ausente").checked){

        TextoAlteracoes("direito","ausente","ovd");
       
    }
    if(document.getElementById("ovd_nv_ig").checked){
        
        TextoAlteracoes("direito","nvig","ovd")
        
    }
    if(document.getElementById("ovd_cistoFolicular").checked){
        alteracoes_exame++
        TextoAlteracoes("direito","cisfol","ovd")

    }
    if(document.getElementById("ovd_cistoHemorragico").checked){
        alteracoes_exame++

        TextoAlteracoes("direito","cishem","ovd")        
    }
    if(document.getElementById("ovd_Policisto").checked){
        alteracoes_exame++
        TextoAlteracoes("direito","policis","ovd") 

    }
    if(document.getElementById("ovd_Teratoma").checked){
        alteracoes_exame++
        TextoAlteracoes("direito","teratoma","ovd") 
        
    }    
    if(document.getElementById("massas_anexiais_ovd").checked){     
        alteracoes_exame++
        if(MA_ovd === 1){
            laudo_tv = laudo_tv.replace("{alt_ovd}","Presença de imagem anexial em ovário direito abaixo descrita:\n<br>{alt_ovd}");
            laudo_tv = laudo_tv.replace("{alt_ovd}",TextoMassasAnexiais("ovd",MA_ovd)+"\n<br>{alt_ovd}");
            laudo_tv = laudo_tv.replace("{diag}","- Imagem nodular em ovário direito acima descrita.<p>\n{diag}</p>")

        }
        if(MA_ovd > 1){
            laudo_tv = laudo_tv.replace("{alt_ovd}","Presença de imagens anexiais em ovário direito abaixo descritas:\n<br>{alt_ovd}");
            for (let index = 1; index <= MA_ovd; index++) {
                laudo_tv = laudo_tv.replace("{alt_ovd}",TextoMassasAnexiais("ovd",index)+"\n<br>{alt_ovd}");
                
            }
            laudo_tv = laudo_tv.replace("{diag}","- Imagens nodulares em ovário direito acima descritas.<p>\n{diag}</p>")
        }
        
        
    }
    


    // ovário esquerdo

    // medidas

    let ove = document.getElementById("medidas_ove").value;
    if(ove == null || ove == ""){
        laudo_tv = laudo_tv.replace("Medidas do ovário: {med_ove}","");
    }else{
        let ove_med = calcularVolume(ove);
        laudo_tv = laudo_tv.replace("{med_ove}",ove_med)
    }
    // var ove_med = calcularVolume(document.getElementById("medidas_ove").value);


    if(document.getElementById("ove_ausente").checked){

        TextoAlteracoes("esquerdo","ausente","ove");
       
    }
    if(document.getElementById("ove_nv_ig").checked){
        
        TextoAlteracoes("esquerdo","nvig","ove")
        
    }
    if(document.getElementById("ove_cistoFolicular").checked){
        alteracoes_exame++
        TextoAlteracoes("esquerdo","cisfol","ove")

    }
    if(document.getElementById("ove_cistoHemorragico").checked){
        alteracoes_exame++

        TextoAlteracoes("esquerdo","cishem","ove")        
    }
    if(document.getElementById("ove_Policisto").checked){
        alteracoes_exame++
        TextoAlteracoes("esquerdo","policis","ove") 

    }
    if(document.getElementById("ove_Teratoma").checked){
        alteracoes_exame++
        TextoAlteracoes("esquerdo","teratoma","ove") 
        
    }    
    if(document.getElementById("massas_anexiais_ove").checked){     
        alteracoes_exame++
        if(MA_ove === 1){
            laudo_tv = laudo_tv.replace("{alt_ove}","Presença de imagem anexial em ovário esquerdo abaixo descrita:\n<br>{alt_ove}");
            laudo_tv = laudo_tv.replace("{alt_ove}",TextoMassasAnexiais("ove",MA_ove)+"\n<br>{alt_ove}");
            laudo_tv = laudo_tv.replace("{diag}","- Imagem nodular em ovário esquerdo acima descrita.<p>\n{diag}</p>")

        }
        if(MA_ove > 1){
            laudo_tv = laudo_tv.replace("{alt_ove}","Presença de imagens anexiais em ovário esquerdo abaixo descritas:\n<br>{alt_ove}");
            for (let index = 1; index <= MA_ove; index++) {
                laudo_tv = laudo_tv.replace("{alt_ove}",TextoMassasAnexiais("ove",index)+"\n<br>{alt_ove}");
                
            }
            laudo_tv = laudo_tv.replace("{diag}","- Imagens nodulares em ovário esquerdo acima descritas.<p>\n{diag}</p>")
        }
        
        
    }
    
    if(alteracoes_exame === 0){
        laudo_tv = laudo_tv.replace("{diag}","- Ausência de alterações em estruturas visualizadas da cavidade pélvica.");

    }

    alteracoes_exame = 0; 

    laudo_tv = laudo_tv.replace("{miomas}<br>","")
    laudo_tv = laudo_tv.replace("{diu}<br>","")
    laudo_tv = laudo_tv.replace("{alt_ovd}<br>","")
    laudo_tv = laudo_tv.replace("{alt_ovd}<br>","")
    laudo_tv = laudo_tv.replace("{alt_ove}","")    
    laudo_tv = laudo_tv.replace("{diag}","");
    laudo_tv = laudo_tv.replace("{adenomiose}<br>","");
    laudo_tv = laudo_tv.replace("{adenomiose}","");
    laudo_tv = laudo_tv.replace("proximo_mioma<br>","");



    //eliminar linhas em branco desnecessárias
    var laudo_final = laudo_tv.replace(/^\s*$[\n\r]{1,}/gm, '');    
    laudo_final = laudo_final.replace(/<p[^>]*><\/p[^>]*>/gm, '');
    laudo_final = laudo_final.replace(/<p[^>]*>[\s|&nbsp;]*<\/p>/gm, '');

    var laudo_final2 = laudo_final.replace(/<br>/gm, ''); 

    // $('p').filter(function () { return $.trim(laudo_final.innerHTML) == "" }).remove();

    // var laudo_final = laudo_tv
    // console.log(laudo_final)
    // console.log(editor.getText(0,10))
    console.log(laudo_final2)



    //como copiar o texto do Quill para área de trabalho ao gerar o laudo
    var editor_id = document.querySelector(".ql-editor")
    editor_id.setAttribute("id","laudo_texto") 

    //como adicionar texto no quill já formatado. ver modelo lá em cima
    editor.root.innerHTML = laudo_final;
    
    console.log(laudo_final)


    laudo_para_copiar = laudo_final;

    // essa função copiou melhor o texto
    CopyToClipboard('laudo_texto')

    

  

    // document.getElementById("GerarLaudo").setAttribute("data-clipboard-target","#laudo_texto")
    // var clipboard = new ClipboardJS(".GeraLaudo");

    // copiar_laudo()


}

function CopyToClipboard(element) {

    var doc = document
    , text = doc.getElementById(element)
    , range, selection;

if (doc.body.createTextRange)
{
    range = doc.body.createTextRange();
    range.moveToElementText(text);
    range.select();
} 

else if (window.getSelection)
{
    selection = window.getSelection();        
    range = doc.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
 }
document.execCommand('copy');
window.getSelection().removeAllRanges();
// document.getElementById("btn").value="Copied";
}




















