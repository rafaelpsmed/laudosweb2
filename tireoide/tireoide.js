
let nodLd = 0;
let nodIst = 0;
let nodLe = 0;

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



function copiar_laudo(){
    //copiar para a área de trabalho  
    // document.getElementById("laudo").select();
    // document.execCommand("copy");

    var clipboard = new ClipboardJS(".btnCopiar");
}

function apagar_laudo(){
   

    var confirma = confirm("Tem certeza que deseja apagar o laudo?");
    if(confirma === true){
        editor.root.innerHTML = "";

    }


}



// lobo direito ausente
var checker_ld = document.getElementById('ld_ausente');
var cb_nod_ld = document.getElementById('nod_ld');
var cb_nod_btn_ld = document.getElementById('nod_btn_ld');
var med_ld = document.getElementById('medidas_ld');
checker_ld.onchange = function() {
    cb_nod_ld.disabled = !!this.checked;
    cb_nod_btn_ld.disabled = !!this.checked;
    med_ld.disabled = !!this.checked;
};
// lobo esquerdo ausente
var checker_le = document.getElementById('le_ausente');
var cb_nod_le = document.getElementById('nod_le');
var cb_nod_btn_le = document.getElementById('nod_btn_le');
var med_le = document.getElementById('medidas_le');
checker_le.onchange = function() {
    cb_nod_le.disabled = !!this.checked;
    cb_nod_btn_le.disabled = !!this.checked;
    med_le.disabled = !!this.checked;
};

//istmo
var cb_nod_ist = document.getElementById('nod_ist');
var cb_nod_btn_ist = document.getElementById('nod_btn_ist');
var med_ist = document.getElementById('medidas_ist');

//tireoidectomia total
var tireoidectomia_total = document.getElementById('tireoidectomia');
tireoidectomia_total.onchange = function() {
    cb_nod_ld.disabled = !!this.checked;
    cb_nod_btn_ld.disabled = !!this.checked;
    med_ld.disabled = !!this.checked;
    cb_nod_le.disabled = !!this.checked;
    cb_nod_btn_le.disabled = !!this.checked;
    med_le.disabled = !!this.checked;
    cb_nod_ist.disabled = !!this.checked;
    cb_nod_btn_ist.disabled = !!this.checked;
    med_ist.disabled = !!this.checked;
    checker_ld.disabled = !!this.checked;
    checker_le.disabled = !!this.checked;
};



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


function teste1(lado){
    console.log(typeof lado)

}

function nodLD(){
    if(document.getElementById("nod_ld").checked){

        nodLd++;
        console.log("nodLD: "+nodLd)
        criar_nodulos("ld",nodLd)
    }

}
function nodLE(){
    if(document.getElementById("nod_le").checked){

        nodLe++;
        console.log("nodLe: "+nodLe)
        criar_nodulos("le",nodLe)
    }

}
function nodIST(){
    if(document.getElementById("nod_ist").checked){

        nodIst++;
        criar_nodulos("ist",nodIst)
    }

}

function criar_nodulos(lado,NumNod){


    let container = document.getElementById("nod_"+lado+"_desc");

    // if(lado === "ld"){
    //     nodLd++
    //     NumNod = nodLd;
    // }

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

    // divNod.appendChild(document.createTextNode("N"+(NumNod)+": "));

    // como criar as labels
    var composicaoLabel = document.createElement("label");
    composicaoLabel.setAttribute("for","nod_"+lado+"_composicao"+(NumNod));
    composicaoLabel.innerHTML = "Composição:"
    composicaoLabel.className = "nod_"+lado+"_composicao"
    divNod.appendChild(composicaoLabel);
    
    // como criar os selects
    var composicao = document.createElement("select");
    // composicao.setAttribute("onchange","tirads('ld',"+qtos_nod+")"); o problema tá aqui tem que arrumar um jeito de passar para a fun~cao tirads 'ld' em vez de ld
    composicao.setAttribute("onchange","tirads(\""+ lado + "\")");
    composicao.options[composicao.options.length] = new Option('Cístico');
    composicao.options[composicao.options.length] = new Option('Predominantemente cístico');
    composicao.options[composicao.options.length] = new Option('Espongiforme');
    composicao.options[composicao.options.length] = new Option('Sólido-cístico');
    composicao.options[composicao.options.length] = new Option('Predominentemente sólido');
    composicao.options[composicao.options.length] = new Option('Sólido');
    composicao.id = "nod_"+lado+"_composicao"+(NumNod);
    composicao.className = "nod_"+lado+"_composicao"
    
    divNod.appendChild(composicao);

    // como criar as labels
    var ecogenicidade = document.createElement("label");
    ecogenicidade.setAttribute("for","nod_"+lado+"_ecogenicidade"+(NumNod));
    ecogenicidade.innerHTML = " Ecogenicidade: ";
    divNod.appendChild(ecogenicidade);


    // como criar os selects
    var ecogenicidade_nod_lado = document.createElement("select");
    ecogenicidade_nod_lado.setAttribute("onchange","tirads(\""+ lado + "\")");
    ecogenicidade_nod_lado.options[ecogenicidade_nod_lado.options.length] = new Option('Anecóico');
    ecogenicidade_nod_lado.options[ecogenicidade_nod_lado.options.length] = new Option('Isoecóico');
    ecogenicidade_nod_lado.options[ecogenicidade_nod_lado.options.length] = new Option('Hiperecóico');
    ecogenicidade_nod_lado.options[ecogenicidade_nod_lado.options.length] = new Option('Hipoecóico');
    ecogenicidade_nod_lado.options[ecogenicidade_nod_lado.options.length] = new Option('Acentuada hipoecogenicidade');
    ecogenicidade_nod_lado.id = "nod_"+lado+"_ecogenicidade"+(NumNod);   
    ecogenicidade_nod_lado.className = "nod_"+lado+"_ecogenicidade";    
    divNod.appendChild(ecogenicidade_nod_lado);

    // como criar as labels
    var forma = document.createElement("label");
    forma.setAttribute("for","nod_"+lado+"_forma"+(NumNod));
    forma.innerHTML = " Forma: "
    divNod.appendChild(forma);

    // como criar os selects
    var forma_nod_lado = document.createElement("select");
    forma_nod_lado.setAttribute("onchange","tirads(\""+ lado + "\")");
    forma_nod_lado.options[forma_nod_lado.options.length] = new Option('mais largo que alto');
    forma_nod_lado.options[forma_nod_lado.options.length] = new Option('mais alto que largo');
    forma_nod_lado.id = "nod_"+lado+"_forma"+(NumNod);  
    forma_nod_lado.className = "nod_"+lado+"_forma";
    divNod.appendChild(forma_nod_lado);            
    
    // como criar as labels
    var margem = document.createElement("label");
    margem.setAttribute("for","nod_"+lado+"_margem"+(NumNod));
    margem.innerHTML = " Margem: "
    divNod.appendChild(margem);

    // como criar os selects
    var margem_nod_lado = document.createElement("select");
    margem_nod_lado.setAttribute("onchange","tirads(\""+ lado + "\")");
    margem_nod_lado.options[margem_nod_lado.options.length] = new Option('Regular');
    margem_nod_lado.options[margem_nod_lado.options.length] = new Option('Mal definida');
    margem_nod_lado.options[margem_nod_lado.options.length] = new Option('Irregular');
    margem_nod_lado.options[margem_nod_lado.options.length] = new Option('Lobulada');
    margem_nod_lado.options[margem_nod_lado.options.length] = new Option('Extensão extra-tireoideana');
    margem_nod_lado.id = "nod_"+lado+"_margem"+(NumNod);
    margem_nod_lado.className = "nod_"+lado+"_margem"
    divNod.appendChild(margem_nod_lado); 
            
    
    // como criar as labels
    var focoEcogenico = document.createElement("label");
    focoEcogenico.setAttribute("for","nod_"+lado+"_focoEcogenico"+(NumNod));
    focoEcogenico.innerHTML = " Foco ecogenico: "
    divNod.appendChild(focoEcogenico);

    // como criar os selects
    var focoEcogenico_nod_lado = document.createElement("select"); 
    focoEcogenico_nod_lado.setAttribute('multiple',true); 
    focoEcogenico_nod_lado.setAttribute("onchange","tirads(\""+ lado + "\")");     
    focoEcogenico_nod_lado.options[focoEcogenico_nod_lado.options.length] = new Option('Ausente');
    focoEcogenico_nod_lado.options[focoEcogenico_nod_lado.options.length] = new Option('Artefato em cauda de cometa');
    focoEcogenico_nod_lado.options[focoEcogenico_nod_lado.options.length] = new Option('Macrocalcificações');
    focoEcogenico_nod_lado.options[focoEcogenico_nod_lado.options.length] = new Option('Calcificações periféricas');
    focoEcogenico_nod_lado.options[focoEcogenico_nod_lado.options.length] = new Option('Microcalcificações');
    focoEcogenico_nod_lado.id = "nod_"+lado+"_focoEcogenico"+(NumNod); 
    focoEcogenico_nod_lado.className = "nod_"+lado+"_focoEcogenico"       
    divNod.appendChild(focoEcogenico_nod_lado);  

    // como criar as labels
    var localizacao = document.createElement("label");
    localizacao.setAttribute("for","nod_"+lado+"_localizacao"+(NumNod));
    localizacao.innerHTML = " Localização: "
    divNod.appendChild(localizacao);

    // como criar os selects
    var localizacao_nod_lado = document.createElement("select");        
    localizacao_nod_lado.options[localizacao_nod_lado.options.length] = new Option('terço superior');
    localizacao_nod_lado.options[localizacao_nod_lado.options.length] = new Option('terço médio/superior');
    localizacao_nod_lado.options[localizacao_nod_lado.options.length] = new Option('terço médio');
    localizacao_nod_lado.options[localizacao_nod_lado.options.length] = new Option('terço médio/inferior');
    localizacao_nod_lado.options[localizacao_nod_lado.options.length] = new Option('terço inferior');
    localizacao_nod_lado.id = "nod_"+lado+"_localizacao"+(NumNod);        
    localizacao_nod_lado.className = "nod_"+lado+"_localizacao";
    divNod.appendChild(localizacao_nod_lado); 

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
    var tirads_pont = document.createElement("label");
    tirads_pont.setAttribute("id","tirads_"+lado+""+(NumNod));
    tirads_pont.innerHTML = " TI-RADS:"
    tirads_pont.className = "tirads_"+lado
    divNod.appendChild(tirads_pont);

    // como criar as labels
    var doppler = document.createElement("label");
    doppler.setAttribute("for","nod_"+lado+"_doppler"+(NumNod));
    doppler.innerHTML = " Doppler: "
    divNod.appendChild(doppler);

    // como criar os selects
    var doppler_nod = document.createElement("select");        
    doppler_nod.options[doppler_nod.options.length] = new Option('Sem estudo Doppler');
    doppler_nod.options[doppler_nod.options.length] = new Option('Sem fluxo ao Doppler');
    doppler_nod.options[doppler_nod.options.length] = new Option('Fluxo periférico ao Doppler');
    doppler_nod.options[doppler_nod.options.length] = new Option('Fluxo periférico maior que central ao Doppler');
    doppler_nod.options[doppler_nod.options.length] = new Option('Fluxo central maior que periférico ao Doppler');
    doppler_nod.options[doppler_nod.options.length] = new Option('Fluxo apenas central ao Doppler');
    doppler_nod.id = "nod_"+lado+"_doppler"+(NumNod); 
    doppler_nod.className = "nod_"+lado+"_doppler"       
    divNod.appendChild(doppler_nod); 

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
// falta adicionar o restante
function removerNod(NumNod,lado){
    let element = document.getElementById("nod_"+lado+"_divId"+NumNod);
    element.parentNode.removeChild(element);

    if(lado === "ld"){
        nodLd--;      

        console.log(nodLd)  

        // [id^='someId'] will match all ids starting with someId.

        // [id$='someId'] will match all ids ending with someId.

        // [id*='someId'] will match all ids containing someId.

        // FUNCIONA COMO ATUALIZAR OS IDs DE TODOS OS COMPONENTES DO NÓDULO
        var divIdNod = document.querySelectorAll("[id*='nod_ld_divId']");        
        var tamanho_divIdNod = divIdNod.length
        for (b=0;b<tamanho_divIdNod;b++){
            var id_elemento = divIdNod[b].id;
            var novo_id = id_elemento.substring(0,id_elemento.length-1);
            divIdNod[b].id = novo_id+(b+1);
            var divIdNod_elementos = document.getElementById("nod_ld_divId"+(b+1)).querySelectorAll(".nod_ld_numero,.nod_ld_composicao,.nod_ld_ecogenicidade,.nod_ld_forma,.nod_ld_margem,.nod_ld_focoEcogenico,.nod_ld_localizacao,.nod_ld_doppler,.nod_ld_remover")
            var tamanho_divIdNod_elementos = divIdNod_elementos.length
            for(q=0;q<tamanho_divIdNod_elementos;q++){
                var id_elemento = divIdNod_elementos[q].id;
                var novo_id = id_elemento.substring(0,id_elemento.length-1);
                
                divIdNod_elementos[q].id = novo_id+(b+1);

                
                document.getElementById("nod_ld_numNodId"+(b+1)).innerHTML = "N"+(b+1)+": "
                

            }
            document.getElementById("nod_ld_remover"+(b+1)).setAttribute("onclick","removerNod("+(b+1)+",\""+ lado + "\")"); 


            
        }
        }
    if(lado === "ist"){
        nodIst--;      

      

        // [id^='someId'] will match all ids starting with someId.

        // [id$='someId'] will match all ids ending with someId.

        // [id*='someId'] will match all ids containing someId.

        // FUNCIONA COMO ATUALIZAR OS IDs DE TODOS OS COMPONENTES DO NÓDULO
        var divIdNod = document.querySelectorAll("[id*='nod_ist_divId']");        
        var tamanho_divIdNod = divIdNod.length
        for (b=0;b<tamanho_divIdNod;b++){
            var id_elemento = divIdNod[b].id;
            var novo_id = id_elemento.substring(0,id_elemento.length-1);
            divIdNod[b].id = novo_id+(b+1);
            var divIdNod_elementos = document.getElementById("nod_ist_divId"+(b+1)).querySelectorAll(".nod_ist_numero,.nod_ist_composicao,.nod_ist_ecogenicidade,.nod_ist_forma,.nod_ist_margem,.nod_ist_focoEcogenico,.nod_ist_localizacao,.nod_ist_doppler,.nod_ist_remover")
            var tamanho_divIdNod_elementos = divIdNod_elementos.length
            for(q=0;q<tamanho_divIdNod_elementos;q++){
                var id_elemento = divIdNod_elementos[q].id;
                var novo_id = id_elemento.substring(0,id_elemento.length-1);
                
                divIdNod_elementos[q].id = novo_id+(b+1);

                
                document.getElementById("nod_ist_numNodId"+(b+1)).innerHTML = "N"+(b+1)+": "
                

            }
            document.getElementById("nod_ist_remover"+(b+1)).setAttribute("onclick","removerNod("+(b+1)+",\""+ lado + "\")"); 


            
        }
        }
    if(lado === "le"){
        nodLe--;      

            

        // [id^='someId'] will match all ids starting with someId.

        // [id$='someId'] will match all ids ending with someId.

        // [id*='someId'] will match all ids containing someId.

        // FUNCIONA COMO ATUALIZAR OS IDs DE TODOS OS COMPONENTES DO NÓDULO
        var divIdNod = document.querySelectorAll("[id*='nod_le_divId']");        
        var tamanho_divIdNod = divIdNod.length
        for (b=0;b<tamanho_divIdNod;b++){
            var id_elemento = divIdNod[b].id;
            var novo_id = id_elemento.substring(0,id_elemento.length-1);
            divIdNod[b].id = novo_id+(b+1);
            var divIdNod_elementos = document.getElementById("nod_le_divId"+(b+1)).querySelectorAll(".nod_le_numero,.nod_le_composicao,.nod_le_ecogenicidade,.nod_le_forma,.nod_le_margem,.nod_le_focoEcogenico,.nod_le_localizacao,.nod_le_doppler,.nod_le_remover")
            var tamanho_divIdNod_elementos = divIdNod_elementos.length
            for(q=0;q<tamanho_divIdNod_elementos;q++){
                var id_elemento = divIdNod_elementos[q].id;
                var novo_id = id_elemento.substring(0,id_elemento.length-1);
                
                divIdNod_elementos[q].id = novo_id+(b+1);

                
                document.getElementById("nod_le_numNodId"+(b+1)).innerHTML = "N"+(b+1)+": "
                

            }
            document.getElementById("nod_le_remover"+(b+1)).setAttribute("onclick","removerNod("+(b+1)+",\""+ lado + "\")"); 


            
        }
        }
}
  



function tirads(lado){
    // calcular tirads


    

    var divIdNod = document.querySelectorAll("[id*='nod_"+lado+"_divId']");        
    var tamanho_divIdNod = divIdNod.length

    for (i=0;i<tamanho_divIdNod;i++){
        var tirads = 0;
        var composicao = document.getElementById("nod_"+lado+"_composicao"+(i+1)).options[document.getElementById("nod_"+lado+"_composicao"+(i+1)).selectedIndex].text;        
        var ecogenicidade = document.getElementById("nod_"+lado+"_ecogenicidade"+(i+1)).options[document.getElementById("nod_"+lado+"_ecogenicidade"+(i+1)).selectedIndex].text;
        var forma = document.getElementById("nod_"+lado+"_forma"+(i+1)).options[document.getElementById("nod_"+lado+"_forma"+(i+1)).selectedIndex].text;
        var margem = document.getElementById("nod_"+lado+"_margem"+(i+1)).options[document.getElementById("nod_"+lado+"_margem"+(i+1)).selectedIndex].text;
        const selected = document.querySelectorAll('#nod_'+lado+'_focoEcogenico'+(i+1)+' option:checked');
        const focoEco = Array.from(selected).map(el => el.value);
        const focoEco_Ar = focoEco.length;

        console.log(composicao)
    
        if(composicao == "Cístico"  || composicao == "Predominantemente cístico"  || composicao == "Espongiforme" ){
            tirads = tirads + 0;
        }
        if(composicao == "Sólido-cístico"){
            tirads = tirads + 1;
        }
        if(composicao == "Predominentemente sólido"  || composicao == "Sólido"){
            tirads = tirads + 2;
        }

        if(ecogenicidade == 'Anecóico'){
            tirads = tirads + 0;
        }
        if(ecogenicidade == 'Isoecóico'  || ecogenicidade == 'Hiperecóico'){
            tirads = tirads + 1;
        } 
        if(ecogenicidade == 'Hipoecóico'){
            tirads = tirads + 2;
        }
        if(ecogenicidade == 'Acentuada hipoecogenicidade'){
            tirads = tirads + 3;
        }
        if(forma == 'mais largo que alto'){
            tirads = tirads + 0;
        }
        if(forma == 'mais alto que largo'){
            tirads = tirads + 3;
        }

        if(margem == 'Regular'){
            tirads = tirads + 0;
        }
        if(margem == 'Mal definida'){
            tirads = tirads + 0;
        }
        if(margem == 'Iregular'){
            tirads = tirads + 2;
        }
        if(margem == 'Lobulada'){
            tirads = tirads + 2;
        }
        if(margem == 'Extensão extra-tireoideana'){
            tirads = tirads + 3;
        }

        // esse método includes serve pra vê se em um array existe determinardo valor. retorna true ou false

        if(focoEco.includes('Ausente')){
            tirads = tirads + 0;
        }
        if(focoEco.includes('Artefato em cauda de cometa')){
            tirads = tirads + 0;
        }        
        if(focoEco.includes('Macrocalcificações')){
            tirads = tirads + 1;
        }        
        if(focoEco.includes('Calcificações periféricas')){
            tirads = tirads + 2;
        }        
        if(focoEco.includes('Microcalcificações')){
            tirads = tirads + 3;
        }      
        


        document.getElementById("tirads_"+lado+""+(i+1)).innerHTML = ' TI-RADS: '+tirads.toString();
        console.log(tirads.toString());



}
}





function nodulos_conclusao_plural(){
    var laudo = document.getElementById("laudo").value;
    if(!(laudo.includes("- Nódulos tireoideanos acima descritos."))){
        console.log("não tem")
        laudo = laudo.replace("{diag}","- Nódulos tireoideanos acima descritos.\n{diag}");
    } 
    document.getElementById("laudo").value = laudo; 

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



function criar_laudo(){

//     var laudo_tv = `<p><b>ULTRASSONOGRAFIA TRANSVAGINAL</b></p><br>
// <p><b>TÉCNICA:</b>{tipo}</p><br>
// <p><b>Indicação clínica:</b> {ind_cli}</p><br>
// <p><b>LAUDO:</b></p><br>
// <p>- Útero em {ut_posi_texto}, de dimensões normais e contornos regulares.{adenomiose}
// Medidas uterinas: {medidas_utero}
// {miomas}<br></p>
// <p>- Endométrio fino e regular, {esp_end}<br>
// {diu}<br></p>
// <p>- Ovário direito de dimensões normais e contornos regulares. Medidas do ovário: {med_ovd}<br>
// {alt_ovd}<br></p>
// <p>- Ovário esquerdo de dimensões normais e contornos regulares. Medidas do ovário: {med_ove}<br>
// {alt_ove}</p><br>
// <p><b>IMPRESSÃO DIAGNÓSTICA:</b><br>
// {diag}</p>

// `
function checarTirads(tirads,medida_texto,lado,i){
    // checar se nódulo é TIRADS 5
    var calc_tirads = tirads.split(":");
    var medida = medida_texto.split(" ");
    var qtas_medidas = medida.length;    
    var calc_tirads2 = Number(calc_tirads[1])
    var nod_paaf = 0;
    if(calc_tirads2 >= 7){
        // checar o tamanho do nódulo
        for(z=0;z<=qtas_medidas;z++){
            if(medida[z]>1){                            
                nod_paaf = 1;
                break;
            }else{
                nod_paaf = 2;                    
            }
            
        }
        if(nod_paaf == 1){
            return [laudo = laudo.replace("{diag}","<p>- O nódulo N"+i+" no lobo "+lado+" classificado como TR5. Pelas suas dimensões, de acordo com os critérios do TI-RADS, sugere-se prosseguir investigação com PAAF.\n{diag}<p>")];
        }
        if(nod_paaf == 2){
            return [laudo = laudo.replace("{diag}","<p>- O nódulo N"+i+" no lobo "+lado+" classificado como TR5. Pelas suas dimensões, de acordo com os critérios do TI-RADS, sugere-se realizar acompanhamento do nódulo.\n{diag}<p>")];

        }
        
    }
    if((calc_tirads2 >= 4) && (calc_tirads2 <= 6)){
        // checar o tamanho do nódulo
        for(z=0;z<=qtas_medidas;z++){
            if(medida[z]>= 1.5){                            
                nod_paaf = 1;
                break;
            }else if(medida[z]>= 1 && medida[z] < 1.5){
                nod_paaf = 2;                    
            }
            
        }
        if(nod_paaf == 1){
            laudo = laudo.replace("{diag}","<p>- O nódulo N"+i+" no lobo "+lado+" classificado como TR4. Pelas suas dimensões, de acordo com os critérios do TI-RADS, sugere-se prosseguir investigação com PAAF.\n{diag}<p>");
        }
        if(nod_paaf == 2){
            laudo = laudo.replace("{diag}","<p>- O nódulo N"+i+" no lobo "+lado+" classificado como TR4. Pelas suas dimensões, de acordo com os critérios do TI-RADS, sugere-se realizar acompanhamento do nódulo.\n{diag}<p>");

        }
        
    }
    if(calc_tirads2 == 3){
        // checar o tamanho do nódulo
        for(z=0;z<=qtas_medidas;z++){
            if(medida[z]>= 2.5){                            
                nod_paaf = 1;
                break;
            }else if(medida[z]>= 1.5 && medida[z] < 2.5){
                nod_paaf = 2;                    
            }
            
        }
        if(nod_paaf == 1){
            laudo = laudo.replace("{diag}","<p>- O nódulo N"+i+" no lobo "+lado+" classificado como TR3. Pelas suas dimensões, de acordo com os critérios do TI-RADS, sugere-se prosseguir investigação com PAAF.\n{diag}</p>");
        }
        if(nod_paaf == 2){
            laudo = laudo.replace("{diag}","<p>- O nódulo N"+i+" no lobo "+lado+" classificado como TR3. Pelas suas dimensões, de acordo com os critérios do TI-RADS, sugere-se realizar acompanhamento do nódulo.\n{diag}</p>");

        }
        
    }

}

function criarTextoNod(lado,nod,lado_extenso){

    var nods = nod;

    if(nods === 1){
        if(lado === "ist"){
            laudo = laudo.replace("{nod_"+lado+"}","- Presença de nódulo no "+lado_extenso+" assim descrito:\n{nods_"+lado+"}");

        }else{
            laudo = laudo.replace("{nod_"+lado+"}","- Presença de nódulo em lobo "+lado_extenso+" assim descrito:\n{nods_"+lado+"}");

        }        
        laudo = laudo.replace("{tireoide}","Tireóide de dimensões normais, contornos regulares e ecotextura heterogênea."); 

    }

    if(nods > 1){
        if(lado === "ist"){
            laudo = laudo.replace("{nod_"+lado+"}","- Presença de nódulos no "+lado_extenso+" assim descritos:\n{nods_"+lado+"}");

        }else{
            laudo = laudo.replace("{nod_"+lado+"}","- Presença de nódulos em lobo "+lado_extenso+" assim descritos:\n{nods_"+lado+"}");
        }      

        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais, contornos regulares e ecotextura heterogênea");              
    }   

    for(i=1;i<=nods;i++){



        // como pegar todos os valores de um select multiple com JQuery                
        var focoEco = $('#nod_'+lado+'_focoEcogenico'+(i)).val().toString();
        // .toString();   
        
        // console.log(focoEco)
        
        
        var composicao = document.getElementById("nod_"+lado+"_composicao"+(i)).options[document.getElementById("nod_"+lado+"_composicao"+(i)).selectedIndex].text;
        var ecogenicidade = document.getElementById("nod_"+lado+"_ecogenicidade"+(i)).options[document.getElementById("nod_"+lado+"_ecogenicidade"+(i)).selectedIndex].text;
        var forma = document.getElementById("nod_"+lado+"_forma"+(i)).options[document.getElementById("nod_"+lado+"_forma"+(i)).selectedIndex].text;
        var margem = document.getElementById("nod_"+lado+"_margem"+(i)).options[document.getElementById("nod_"+lado+"_margem"+(i)).selectedIndex].text;                
        var localizacao = document.getElementById("nod_"+lado+"_localizacao"+(i)).options[document.getElementById("nod_"+lado+"_localizacao"+(i)).selectedIndex].text;
        let medida_texto = document.getElementById("medida_nod_"+lado+""+(i)).value;
        let medidasNod = calcularVolume(medida_texto);
        var tirads = document.getElementById("tirads_"+lado+""+(i)).textContent;
        let doppler = document.getElementById("nod_"+lado+"_doppler"+(i)).selectedIndex;
        let doppler_desc = "";

        if(doppler === 0){
            doppler_desc = "";

        }  
        if(doppler === 1){
            doppler_desc = ". Não há fluxo ao Doppler (CHAMMAS I).";

        }  
        if(doppler === 2){
            doppler_desc = ". O nódulo apresenta fluxo periférico ao Doppler (CHAMMAS II).";

        }  
        if(doppler === 3){
            doppler_desc = ". O nódulo apresenta fluxo periférico maior que central ao Doppler (CHAMMAS III).";

        }  
        if(doppler === 4){
            doppler_desc = ". O nódulo apresenta fluxo central maior que periférico ao Doppler (CHAMMAS IV).";

        }  
        if(doppler === 5){
            doppler_desc = ". O nódulo apresenta fluxo apenas central ao Doppler (CHAMMAS V).";

        }

        laudo = laudo.replace("{nods_"+lado+"}","<p><b>N"+(i)+":</b> <b>Composição:</b> "+composicao+". <b>Ecogenicidade:</b> "+ecogenicidade+". <b>Forma:</b> "+forma+". <b>Margem:</b> "+margem+". <b>Foco(s) ecogênico(s):</b> {fe}. <b>Localização:</b> "+localizacao+". <b>Medida(s):</b> "+medidasNod+". <b>"+tirads+"</b>"+doppler_desc+"</p>\n{nods_"+lado+"}");
        

        laudo = laudo.replace("{fe}",focoEco);           

        
       checarTirads(tirads,medida_texto,lado_extenso,i);         

    }

}

var laudo=`<p><b>ULTRASSONOGRAFIA DA TIREÓIDE</b></p>
<p><b>TÉCNICA:</b> Exame realizado com transdutor linear de alta frequência.</p>
<p><b>INDICAÇÃO CLÍNICA:</b> {ic}</p>
<p><b>LAUDO:</b></p>
<p>{tireoide}.{cis_col} </p>
<p>{nod_ld}</p>
<p>{nod_ist}</p>
<p>{nod_le}</p>

<p><b>Medidas:</b></p>
<p>Lodo direito: {ld1} x {ld2} x {ld3} cm. Volume: {ld_vol} cm³.</p>
<p>Lodo esquerdo: {le1} x {le2} x {le3} cm. Volume: {le_vol} cm³.</p>
<p>Istmo: {ist} cm.</p>
<p>Volume total: {vol_tir} cm³.</p>
<p><b>IMPRESSÃO DIAGNÓSTICA:</b></p>
{diag}

    


`
var laudo_TT = `<b>ULTRASSONOGRAFIA DA TIREÓIDE</b>
<p><b>TÉCNICA:</b> Exame realizado com transdutor linear de alta frequência.</p>
<p><b>INDICAÇÃO CLÍNICA:</b> {ic}</p>
<p><b>LAUDO:</b></p>

<p>- Tireóide ausente. Relato de cirurgia prévia. Ausência de massas ou coleções em sua topografia.

- Glândulas parótidas e submandibulares de aspecto ecográfico e dimensões normais ao método.

- Ausência de massas, coleções ou linfonodomegalias em região cervical.</p>

<p><b>IMPRESSÃO DIAGNÓSTICA:</b>
- Status pós-tireoidectomia total.</p>
`

    

    if(nodLd+nodLe+nodIst>1){
        laudo = laudo.replace("{diag}","<p>- Nódulos tireoideanos acima descritos.\n{diag}</p>")

    }

    if( document.getElementById("tireoidectomia").checked){
        laudo = laudo_TT;

    }   
    if( document.getElementById("ld_ausente").checked){
        laudo = laudo.replace("{nod_d}","- Lobo direito ausente. Relato de cirurgia prévia. Ausência de massas ou coleções em sua topografia.")
        laudo = laudo.replace("{tireoide}.{cis_col}","")
        laudo = laudo.replace("{ist_}","")
        laudo = laudo.replace("Istmo: {ist} cm.","")
        laudo = laudo.replace("Volume total: {vol_tir} cm³.","")
        laudo = laudo.replace("Lodo direito: {ld1} x {ld2} x {ld3} cm. Volume: {ld_vol} cm³.","")        
        laudo = laudo.replace("{diag}","<p>- Status pós-tireoidectomia parcial à direita.\n{diag}</p>")        


    }
    if( document.getElementById("le_ausente").checked){
        laudo = laudo.replace("{nod_e}","- Lobo esquerdo ausente. Relato de cirurgia prévia. Ausência de massas ou coleções em sua topografia.")
        laudo = laudo.replace("{tireoide}.{cis_col}","")
        laudo = laudo.replace("{ist_}","")
        laudo = laudo.replace("Istmo: {ist} cm.","")
        laudo = laudo.replace("Volume total: {vol_tir} cm³.","")
        laudo = laudo.replace("Lodo esquerdo: {le1} x {le2} x {le3} cm. Volume: {le_vol} cm³.","")        
        laudo = laudo.replace("{diag}","<p>- Status pós-tireoidectomia parcial à esquerda.\n{diag}</p>")     


    }


    let indicacao = document.getElementById("indicacao").value;
    if(indicacao == null || indicacao == ""){
        laudo = laudo.replace("{ic}","Avaliação clínica.");
    }else{
        laudo = laudo.replace("{ic}",indicacao);
    }

    var teste = $('#textura_tireoide').val();
    // console.log(teste.length)


    //ver melhor esses includes para caber vários casos.
    if(teste == "Tireóide normal" ){
        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais, contornos regulares e ecotextura homogênea");        
        laudo = laudo.replace("{diag}","<p>- Tireóide de aspecto ecográfico dentro dos limites da normalidade.</p>");
        
    }
    // if(teste == "Diminutos cistos colóides bilaterais" ){
    //     laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais, contornos regulares e ecotextura heterogênea à custa de diminutos cistos colóides bilaterais.");        
    //     laudo = laudo.replace("{diag}","- Tireóide de aspecto ecográfico dentro dos limites da normalidade");
        
    // }
    if(teste.includes("Tireoideopatia inicial") ){
        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais e contornos regulares, apresentando diminuição de sua ecogenicidade parenquimatosa");
        laudo = laudo.replace("{diag}","<p>- Sinais ecográficos de tireoidopatia. Correlacionar com dados clínicos e laboratoriais.\n{diag}</p>");
        
    }
    if(teste.includes("Tireoideopatia crônica com dimensões normais") ){
        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais, de contornos irregulares, aspecto micronodular difuso, diminuição de sua ecogenicidade parenquimatosa, com traves ecogênicas em permeio");
        laudo = laudo.replace("{diag}","<p>- Sinais ecográficos de tireoidopatia linfocítica crônica.\n{diag}</p>");
        
    }
    if(teste.includes("Tireoideopatia crônica com dimensões reduzidas") ){
        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões reduzidas, de contornos irregulares, aspecto micronodular difuso, diminuição de sua ecogenicidade parenquimatosa, com traves ecogênicas em permeio");
        laudo = laudo.replace("{diag}","<p>- Sinais ecográficos de tireoidopatia linfocítica crônica.\n{diag}</p>");
        
    }
    if(teste.includes("Diminutos cistos colóides bilaterais")  ){
        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais com contornos regulares e ecotextura heterogênea.");  
        laudo = laudo.replace("{cis_col}"," Presença de diminutos cistos colóides bilaterais.{cis_col}");
        laudo = laudo.replace("{diag}","</p>- Diminutos cistos colóides bilaterais.\n{diag}</p>");
        
    }
    if(teste.includes("Diminutos cistos colóides lobo direito") ){
        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais com contornos regulares e ecotextura heterogênea."); 
        laudo = laudo.replace("{cis_col}"," Presença de diminutos cistos colóides em lobo direito.{cis_col}");
        laudo = laudo.replace("{diag}","<p>- Diminutos cistos colóides no lobo direito.\n{diag}</p>");
        
    }
    if(teste.includes("Diminutos cistos colóides lobo esquerdo") ){
        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais com contornos regulares e ecotextura heterogênea."); 
        laudo = laudo.replace("{cis_col}"," Presença de diminutos cistos colóides em lobo esquerdo.{cis_col}");
        laudo = laudo.replace("{diag}","<p>- Diminutos cistos colóides no lobo esquerdo.\n{diag}</p>");
        
    }
    if(teste.includes("Cisto colóide lobo direito") ){
        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais com contornos regulares e ecotextura heterogênea."); 
        laudo = laudo.replace("{cis_col}"," Presença de cisto colóide em lobo direito.{cis_col}");
        laudo = laudo.replace("{diag}","<p>- Cisto colóide no lobo direito.\n{diag}</p>");
        
    }
    if(teste.includes("Cisto colóide lobo esquerdo") ){
        laudo = laudo.replace("{tireoide}","- Tireóide de dimensões normais com contornos regulares e ecotextura heterogênea."); 
        laudo = laudo.replace("{cis_col}"," Presença de cisto colóide em lobo esquerdo.{cis_col}");
        laudo = laudo.replace("{diag}","<p>- Cisto colóide no lobo esquerdo.\n{diag}</p>");
        
    }
    


        // descrição dos nódulos à direita
    if( document.getElementById("nod_ld").checked){  
        
        criarTextoNod("ld",nodLd,"direito")           

            
    }else{
        laudo = laudo.replace("{nod_d}","- Ausência de sinais de lesões nodulares em lobo direito.")
    }
    ///////////////////////////////////////////////////////
    // descrição dos nódulos à esquerda


    if( document.getElementById("nod_le").checked){ 
        
        criarTextoNod("le",nodLe,"esquerdo")             

            
    }else{
        laudo = laudo.replace("{nod_le}","- Ausência de sinais de lesões nodulares no lobo esquerdo.")
    }

    ///////////////////////////////////////////////////////
        // descrição dos nódulos no istmo

    if( document.getElementById("nod_ist").checked){   

        criarTextoNod("ist",nodIst,"istmo")                 
    
                
    }else{
        laudo = laudo.replace("{nod_ist}","- Ausência de sinais de lesões nodulares no istmo.")
        
    }

        ///////////////////////////////////////////////
    // volume da tireóide
    var ld = document.getElementById("medidas_ld").value.split(" ");
    var ld1 = parseFloat(ld[0]);
    var ld2 = parseFloat(ld[1]);
    var ld3 = parseFloat(ld[2]);

    var le = document.getElementById("medidas_le").value.split(" ");
    var le1 = parseFloat(le[0]);
    var le2 = parseFloat(le[1]);
    var le3 = parseFloat(le[2]);

    var ld_vol = Math.round(ld1*ld2*ld3*0.523)
    var le_vol = Math.round(le1*le2*le3*0.523)

    laudo = laudo.replace("{ld1}",ld1.toString());
    laudo = laudo.replace("{ld2}",ld2.toString());
    laudo = laudo.replace("{ld3}",ld3.toString());
    laudo = laudo.replace("{ld_vol}",ld_vol.toString());

    laudo = laudo.replace("{le1}",le1.toString());
    laudo = laudo.replace("{le2}",le2.toString());
    laudo = laudo.replace("{le3}",le3.toString());
    laudo = laudo.replace("{le_vol}",le_vol.toString());

    laudo = laudo.replace("{ist}",document.getElementById("medidas_ist").value);

    var vol_tot = (ld_vol+le_vol)

    laudo = laudo.replace("{vol_tir}",vol_tot.toString());

    if(vol_tot > 16){
        laudo = laudo.replace("Tireóide de dimensões normais","Tireóide de dimensões aumentadas");
            }

////////////////////////////////////////////////////////////


    
    

    laudo = laudo.replace("{diag}","");
    laudo = laudo.replace("{tireoide}","");
    laudo = laudo.replace("{cis_col}","");
    laudo = laudo.replace("{nod_ld}","");
    laudo = laudo.replace("{nod_ist}","");
    laudo = laudo.replace("{nod_le}","");
    laudo = laudo.replace("{nods_ist}","");
    laudo = laudo.replace("{nods_ld}","");
    laudo = laudo.replace("{nods_le}","");
    laudo = laudo.replace("{ini_diag}","");
    laudo = laudo.replace("{fim_diag}","");
    // document.getElementById("laudo").value = laudo; 


    //eliminar linhas em branco desnecessárias
    var laudo_final = laudo.replace(/^\s*$[\n\r]{1,}/gm, '');
    laudo_final = laudo_final.replace(/<p[^>]*><\/p[^>]*>/gm, '');
    laudo_final = laudo_final.replace(/<p[^>]*>[\s|&nbsp;]*<\/p>/gm, '');



    //como copiar o texto do Quill para área de trabalho ao gerar o laudo
    var editor_id = document.querySelector(".ql-editor")
    editor_id.setAttribute("id","laudo_texto") 

    //como adicionar texto no quill já formatado. ver modelo lá em cima
    editor.root.innerHTML = laudo_final;

    console.log(laudo_final)

    CopyToClipboard('laudo_texto')


    // document.getElementById("GerarLaudo").setAttribute("data-clipboard-target","#laudo_texto")
    // var clipboard = new ClipboardJS(".GeraLaudo");




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




///////////////////////////////////////////////////
//código lixo

//         while (container.hasChildNodes()){
//             container.removeChild(container.lastChild);
//         }
//         for (i=0;i<qtos_nod_ld;i++){
//             container.appendChild(document.createTextNode("N"+(i+1)+": "));
    
//             // como criar as labels
//             var composicaoLabel = document.createElement("label");
//             composicaoLabel.setAttribute("for","nod_ld_composicao"+(i+1));
//             composicaoLabel.innerHTML = "Composição:"
//             container.appendChild(composicaoLabel);
            
//             // como criar os selects
//             var composicao = document.createElement("select");
//             composicao.setAttribute("onchange","tirads()");
//             composicao.options[composicao.options.length] = new Option('Cístico');
//             composicao.options[composicao.options.length] = new Option('Predominantemente cístico');
//             composicao.options[composicao.options.length] = new Option('Espongiforme');
//             composicao.options[composicao.options.length] = new Option('Sólido-cístico');
//             composicao.options[composicao.options.length] = new Option('Predominentemente sólido');
//             composicao.options[composicao.options.length] = new Option('Sólido');
//             composicao.id = "nod_ld_composicao"+(i+1);
            
//             container.appendChild(composicao);
    
//             // como criar as labels
//             var ecogenicidade = document.createElement("label");
//             ecogenicidade.setAttribute("for","nod_ld_ecogenicidade"+(i+1));
//             ecogenicidade.innerHTML = " Ecogenicidade: "
//             container.appendChild(ecogenicidade);
    
//             // como criar os selects
//             var ecogenicidade_nod_ld = document.createElement("select");
//             ecogenicidade_nod_ld.setAttribute("onchange","tirads()");
//             ecogenicidade_nod_ld.options[ecogenicidade_nod_ld.options.length] = new Option('Anecóico');
//             ecogenicidade_nod_ld.options[ecogenicidade_nod_ld.options.length] = new Option('Isoecóico');
//             ecogenicidade_nod_ld.options[ecogenicidade_nod_ld.options.length] = new Option('Hiperecóico');
//             ecogenicidade_nod_ld.options[ecogenicidade_nod_ld.options.length] = new Option('Hipoecóico');
//             ecogenicidade_nod_ld.options[ecogenicidade_nod_ld.options.length] = new Option('Acentuada hipoecogenicidade');
//             ecogenicidade_nod_ld.id = "nod_ld_ecogenicidade"+(i+1);        
//             container.appendChild(ecogenicidade_nod_ld);

//             // como criar as labels
//             var forma = document.createElement("label");
//             forma.setAttribute("for","nod_ld_forma"+(i+1));
//             forma.innerHTML = " Forma: "
//             container.appendChild(forma);
    
//             // como criar os selects
//             var forma_nod_ld = document.createElement("select");
//             forma_nod_ld.setAttribute("onchange","tirads()");
//             forma_nod_ld.options[forma_nod_ld.options.length] = new Option('mais largo que alto');
//             forma_nod_ld.options[forma_nod_ld.options.length] = new Option('mais alto que largo');
//             forma_nod_ld.id = "nod_ld_forma"+(i+1);        
//             container.appendChild(forma_nod_ld);            
            
//             // como criar as labels
//             var margem = document.createElement("label");
//             margem.setAttribute("for","nod_ld_margem"+(i+1));
//             margem.innerHTML = " Margem: "
//             container.appendChild(margem);
    
//             // como criar os selects
//             var margem_nod_ld = document.createElement("select");
//             margem_nod_ld.setAttribute("onchange","tirads()");
//             margem_nod_ld.options[margem_nod_ld.options.length] = new Option('Regular');
//             margem_nod_ld.options[margem_nod_ld.options.length] = new Option('Mal definida');
//             margem_nod_ld.options[margem_nod_ld.options.length] = new Option('Irregular');
//             margem_nod_ld.options[margem_nod_ld.options.length] = new Option('Lobulada');
//             margem_nod_ld.options[margem_nod_ld.options.length] = new Option('Extensão extra-tireoideana');
//             margem_nod_ld.id = "nod_ld_margem"+(i+1);        
//             container.appendChild(margem_nod_ld); 
                   
            
//             // como criar as labels
//             var focoEcogenico = document.createElement("label");
//             focoEcogenico.setAttribute("for","nod_ld_focoEcogenico"+(i+1));
//             focoEcogenico.innerHTML = " Foco ecogenico: "
//             container.appendChild(focoEcogenico);
    
//             // como criar os selects
//             var focoEcogenico_nod_ld = document.createElement("select"); 
//             focoEcogenico_nod_ld.setAttribute('multiple',true); 
//             focoEcogenico_nod_ld.setAttribute("onchange","tirads()");        
//             focoEcogenico_nod_ld.options[focoEcogenico_nod_ld.options.length] = new Option('Ausente');
//             focoEcogenico_nod_ld.options[focoEcogenico_nod_ld.options.length] = new Option('Artefato em cauda de cometa');
//             focoEcogenico_nod_ld.options[focoEcogenico_nod_ld.options.length] = new Option('Macrocalcificações');
//             focoEcogenico_nod_ld.options[focoEcogenico_nod_ld.options.length] = new Option('Calcificações periféricas');
//             focoEcogenico_nod_ld.options[focoEcogenico_nod_ld.options.length] = new Option('Microcalcificações');
//             focoEcogenico_nod_ld.id = "nod_ld_focoEcogenico"+(i+1);        
//             container.appendChild(focoEcogenico_nod_ld);  

//             // como criar as labels
//             var localizacao = document.createElement("label");
//             localizacao.setAttribute("for","nod_ld_localizacao"+(i+1));
//             localizacao.innerHTML = " Localização: "
//             container.appendChild(localizacao);
    
//             // como criar os selects
//             var localizacao_nod_ld = document.createElement("select");        
//             localizacao_nod_ld.options[localizacao_nod_ld.options.length] = new Option('terço superior');
//             localizacao_nod_ld.options[localizacao_nod_ld.options.length] = new Option('terço médio/superior');
//             localizacao_nod_ld.options[localizacao_nod_ld.options.length] = new Option('terço médio');
//             localizacao_nod_ld.options[localizacao_nod_ld.options.length] = new Option('terço médio/inferior');
//             localizacao_nod_ld.options[localizacao_nod_ld.options.length] = new Option('terço inferior');
//             localizacao_nod_ld.id = "nod_ld_localizacao"+(i+1);        
//             container.appendChild(localizacao_nod_ld); 

//             // como criar as labels
//             var medida = document.createElement("label");
//             medida.setAttribute("for","nod_ld_medida"+(i+1));
//             medida.innerHTML = " Medidas: "
//             container.appendChild(medida);

//             // criar o input medidas
//             var medida_nod_ld = document.createElement("input"); 
//             medida_nod_ld.id = "medida_nod_ld"+(i+1);  
//             container.appendChild(medida_nod_ld); 
            
//             // como criar as labels
//             var tirads_pont = document.createElement("label");
//             tirads_pont.setAttribute("id","tirads"+(i+1));
//             tirads_pont.innerHTML = " TI-RADS:"
//             container.appendChild(tirads_pont);


  
//             container.appendChild(document.createElement("br"));          



//     }
//     // tirads(qtos_nod_ld)

// function tirads(){
//     // calcular tirads

//     var qtos_nod = document.getElementById("qtos_nod_ld").value;

//     for (i=0;i<qtos_nod;i++){
//         var tirads = 0;
//         var composicao = document.getElementById("nod_ld_composicao"+(i+1)).options[document.getElementById("nod_ld_composicao"+(i+1)).selectedIndex].text;        
//         var ecogenicidade = document.getElementById("nod_ld_ecogenicidade"+(i+1)).options[document.getElementById("nod_ld_ecogenicidade"+(i+1)).selectedIndex].text;
//         var forma = document.getElementById("nod_ld_forma"+(i+1)).options[document.getElementById("nod_ld_forma"+(i+1)).selectedIndex].text;
//         var margem = document.getElementById("nod_ld_margem"+(i+1)).options[document.getElementById("nod_ld_margem"+(i+1)).selectedIndex].text;
//         const selected = document.querySelectorAll('#nod_ld_focoEcogenico'+(i+1)+' option:checked');
//         const focoEco = Array.from(selected).map(el => el.value);
//         const focoEco_Ar = focoEco.length;
    
//         if(composicao == "Cístico"  || composicao == "Predominantemente cístico"  || composicao == "Espongiforme" ){
//             tirads = tirads + 0;
//         }
//         if(composicao == "Sólido-cístico"){
//             tirads = tirads + 1;
//         }
//         if(composicao == "Predominentemente sólido"  || composicao == "Sólido"){
//             tirads = tirads + 2;
//         }

//         if(ecogenicidade == 'Anecóico'){
//             tirads = tirads + 0;
//         }
//         if(ecogenicidade == 'Isoecóico'  || ecogenicidade == 'Hiperecóico'){
//             tirads = tirads + 1;
//         } 
//         if(ecogenicidade == 'Hipoecóico'){
//             tirads = tirads + 2;
//         }
//         if(ecogenicidade == 'Acentuada hipoecogenicidade'){
//             tirads = tirads + 3;
//         }
//         if(forma == 'mais largo que alto'){
//             tirads = tirads + 0;
//         }
//         if(forma == 'mais alto que largo'){
//             tirads = tirads + 3;
//         }

//         if(margem == 'Regular'){
//             tirads = tirads + 0;
//         }
//         if(margem == 'Mal definida'){
//             tirads = tirads + 0;
//         }
//         if(margem == 'Iregular'){
//             tirads = tirads + 2;
//         }
//         if(margem == 'Lobulada'){
//             tirads = tirads + 2;
//         }
//         if(margem == 'Extensão extra-tireoideana'){
//             tirads = tirads + 3;
//         }

//         // esse método includes serve pra vê se em um array existe determinardo valor. retorna true ou false

//         if(focoEco.includes('Ausente')){
//             tirads = tirads + 0;
//         }
//         if(focoEco.includes('Artefato em cauda de cometa')){
//             tirads = tirads + 0;
//         }        
//         if(focoEco.includes('Macrocalcificações')){
//             tirads = tirads + 1;
//         }        
//         if(focoEco.includes('Calcificações periféricas')){
//             tirads = tirads + 2;
//         }        
//         if(focoEco.includes('Microcalcificações')){
//             tirads = tirads + 3;
//         }      
        


//         document.getElementById("tirads_ld"+(i+1)).innerHTML = ' TI-RADS: '+tirads.toString();



//         }

        

  
     



// }

// function tirads_ist(){
//     var qtos_nod = document.getElementById("qtos_nod_ist").value;

//     for (i=0;i<qtos_nod;i++){
//         var tirads = 0;
//         var composicao = document.getElementById("nod_ist_composicao"+(i+1)).options[document.getElementById("nod_ist_composicao"+(i+1)).selectedIndex].text;        
//         var ecogenicidade = document.getElementById("nod_ist_ecogenicidade"+(i+1)).options[document.getElementById("nod_ist_ecogenicidade"+(i+1)).selectedIndex].text;
//         var forma = document.getElementById("nod_ist_forma"+(i+1)).options[document.getElementById("nod_ist_forma"+(i+1)).selectedIndex].text;
//         var margem = document.getElementById("nod_ist_margem"+(i+1)).options[document.getElementById("nod_ist_margem"+(i+1)).selectedIndex].text;
//         const selected = document.querySelectorAll('#nod_ist_focoEcogenico'+(i+1)+' option:checked');
//         const focoEco = Array.from(selected).map(el => el.value);
//         const focoEco_Ar = focoEco.length;
    
//         if(composicao == "Cístico"  || composicao == "Predominantemente cístico"  || composicao == "Espongiforme" ){
//             tirads = tirads + 0;
//         }
//         if(composicao == "Sólido-cístico"){
//             tirads = tirads + 1;
//         }
//         if(composicao == "Predominentemente sólido"  || composicao == "Sólido"){
//             tirads = tirads + 2;
//         }

//         if(ecogenicidade == 'Anecóico'){
//             tirads = tirads + 0;
//         }
//         if(ecogenicidade == 'Isoecóico'  || ecogenicidade == 'Hiperecóico'){
//             tirads = tirads + 1;
//         } 
//         if(ecogenicidade == 'Hipoecóico'){
//             tirads = tirads + 2;
//         }
//         if(ecogenicidade == 'Acentuada hipoecogenicidade'){
//             tirads = tirads + 3;
//         }
//         if(forma == 'mais largo que alto'){
//             tirads = tirads + 0;
//         }
//         if(forma == 'mais alto que largo'){
//             tirads = tirads + 3;
//         }

//         if(margem == 'Regular'){
//             tirads = tirads + 0;
//         }
//         if(margem == 'Mal definida'){
//             tirads = tirads + 0;
//         }
//         if(margem == 'Iregular'){
//             tirads = tirads + 2;
//         }
//         if(margem == 'Lobulada'){
//             tirads = tirads + 2;
//         }
//         if(margem == 'Extensão extra-tireoideana'){
//             tirads = tirads + 3;
//         }

//         // esse método includes serve pra vê se em um array existe determinardo valor. retorna true ou false

//         if(focoEco.includes('Ausente')){
//             tirads = tirads + 0;
//         }
//         if(focoEco.includes('Artefato em cauda de cometa')){
//             tirads = tirads + 0;
//         }        
//         if(focoEco.includes('Macrocalcificações')){
//             tirads = tirads + 1;
//         }        
//         if(focoEco.includes('Calcificações periféricas')){
//             tirads = tirads + 2;
//         }        
//         if(focoEco.includes('Microcalcificações')){
//             tirads = tirads + 3;
//         }      
        


//         document.getElementById("tirads_ist"+(i+1)).innerHTML = ' TI-RADS: '+tirads.toString();
        
//     }

// }




// function tirads_le(){
//     var qtos_nod = document.getElementById("qtos_nod_le").value;

//     for (i=0;i<qtos_nod;i++){
//         var tirads = 0;
//         var composicao = document.getElementById("nod_le_composicao"+(i+1)).options[document.getElementById("nod_le_composicao"+(i+1)).selectedIndex].text;        
//         var ecogenicidade = document.getElementById("nod_le_ecogenicidade"+(i+1)).options[document.getElementById("nod_le_ecogenicidade"+(i+1)).selectedIndex].text;
//         var forma = document.getElementById("nod_le_forma"+(i+1)).options[document.getElementById("nod_le_forma"+(i+1)).selectedIndex].text;
//         var margem = document.getElementById("nod_le_margem"+(i+1)).options[document.getElementById("nod_le_margem"+(i+1)).selectedIndex].text;
//         const selected = document.querySelectorAll('#nod_le_focoEcogenico'+(i+1)+' option:checked');
//         const focoEco = Array.from(selected).map(el => el.value);
//         const focoEco_Ar = focoEco.length;
    
//         if(composicao == "Cístico"  || composicao == "Predominantemente cístico"  || composicao == "Espongiforme" ){
//             tirads = tirads + 0;
//         }
//         if(composicao == "Sólido-cístico"){
//             tirads = tirads + 1;
//         }
//         if(composicao == "Predominentemente sólido"  || composicao == "Sólido"){
//             tirads = tirads + 2;
//         }

//         if(ecogenicidade == 'Anecóico'){
//             tirads = tirads + 0;
//         }
//         if(ecogenicidade == 'Isoecóico'  || ecogenicidade == 'Hiperecóico'){
//             tirads = tirads + 1;
//         } 
//         if(ecogenicidade == 'Hipoecóico'){
//             tirads = tirads + 2;
//         }
//         if(ecogenicidade == 'Acentuada hipoecogenicidade'){
//             tirads = tirads + 3;
//         }
//         if(forma == 'mais largo que alto'){
//             tirads = tirads + 0;
//         }
//         if(forma == 'mais alto que largo'){
//             tirads = tirads + 3;
//         }

//         if(margem == 'Regular'){
//             tirads = tirads + 0;
//         }
//         if(margem == 'Mal definida'){
//             tirads = tirads + 0;
//         }
//         if(margem == 'Iregular'){
//             tirads = tirads + 2;
//         }
//         if(margem == 'Lobulada'){
//             tirads = tirads + 2;
//         }
//         if(margem == 'Extensão extra-tireoideana'){
//             tirads = tirads + 3;
//         }

//         // esse método includes serve pra vê se em um array existe determinardo valor. retorna true ou false

//         if(focoEco.includes('Ausente')){
//             tirads = tirads + 0;
//         }
//         if(focoEco.includes('Artefato em cauda de cometa')){
//             tirads = tirads + 0;
//         }        
//         if(focoEco.includes('Macrocalcificações')){
//             tirads = tirads + 1;
//         }        
//         if(focoEco.includes('Calcificações periféricas')){
//             tirads = tirads + 2;
//         }        
//         if(focoEco.includes('Microcalcificações')){
//             tirads = tirads + 3;
//         }      
        


//         document.getElementById("tirads_le"+(i+1)).innerHTML = ' TI-RADS: '+tirads.toString();
        
//     }

// }

// function nodulos_conclusao_singular(){
//     var laudo = document.getElementById("laudo").value;
//     if(laudo.includes("- Nódulo tireoideano acima descrito.")){

//     } else{
//         laudo = laudo.replace("{diag}","- Nódulo tireoideano acima descrito.");

//     } 

// }



// if(document.getElementById("nod_le").checked){
//     var qtos_nod_le = document.getElementById("qtos_nod_le").value;
//     var container = document.getElementById("nod_le_desc");

//     while (container.hasChildNodes()){
//         container.removeChild(container.lastChild);
//     }
//     for (i=0;i<qtos_nod_le;i++){
//         container.appendChild(document.createTextNode("N"+(i+1)+": "));

//         // como criar as labels
//         var composicaoLabel = document.createElement("label");
//         composicaoLabel.setAttribute("for","nod_le_composicao"+(i+1));
//         composicaoLabel.innerHTML = "Composição:"
//         container.appendChild(composicaoLabel);
        
//         // como criar os selects
//         var composicao = document.createElement("select");
//         composicao.setAttribute("onchange","tirads_le()");
//         composicao.options[composicao.options.length] = new Option('Cístico');
//         composicao.options[composicao.options.length] = new Option('Predominantemente cístico');
//         composicao.options[composicao.options.length] = new Option('Espongiforme');
//         composicao.options[composicao.options.length] = new Option('Sólido-cístico');
//         composicao.options[composicao.options.length] = new Option('Predominentemente sólido');
//         composicao.options[composicao.options.length] = new Option('Sólido');
//         composicao.id = "nod_le_composicao"+(i+1);
        
//         container.appendChild(composicao);

//         // como criar as labels
//         var ecogenicidade = document.createElement("label");
//         ecogenicidade.setAttribute("for","nod_le_ecogenicidade"+(i+1));
//         ecogenicidade.innerHTML = " Ecogenicidade: "
//         container.appendChild(ecogenicidade);

//         // como criar os selects
//         var ecogenicidade_nod_le = document.createElement("select");
//         ecogenicidade_nod_le.setAttribute("onchange","tirads_le()");
//         ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Anecóico');
//         ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Isoecóico');
//         ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Hiperecóico');
//         ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Hipoecóico');
//         ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Acentuada hipoecogenicidade');
//         ecogenicidade_nod_le.id = "nod_le_ecogenicidade"+(i+1);        
//         container.appendChild(ecogenicidade_nod_le);

//         // como criar as labels
//         var forma = document.createElement("label");
//         forma.setAttribute("for","nod_le_forma"+(i+1));
//         forma.innerHTML = " Forma: "
//         container.appendChild(forma);

//         // como criar os selects
//         var forma_nod_le = document.createElement("select");
//         forma_nod_le.setAttribute("onchange","tirads_le()");
//         forma_nod_le.options[forma_nod_le.options.length] = new Option('mais largo que alto');
//         forma_nod_le.options[forma_nod_le.options.length] = new Option('mais alto que largo');
//         forma_nod_le.id = "nod_le_forma"+(i+1);        
//         container.appendChild(forma_nod_le);            
        
//         // como criar as labels
//         var margem = document.createElement("label");
//         margem.setAttribute("for","nod_le_margem"+(i+1));
//         margem.innerHTML = " Margem: "
//         container.appendChild(margem);

//         // como criar os selects
//         var margem_nod_le = document.createElement("select");
//         margem_nod_le.setAttribute("onchange","tirads_le()");
//         margem_nod_le.options[margem_nod_le.options.length] = new Option('Regular');
//         margem_nod_le.options[margem_nod_le.options.length] = new Option('Mal definida');
//         margem_nod_le.options[margem_nod_le.options.length] = new Option('Irregular');
//         margem_nod_le.options[margem_nod_le.options.length] = new Option('Lobulada');
//         margem_nod_le.options[margem_nod_le.options.length] = new Option('Extensão extra-tireoideana');
//         margem_nod_le.id = "nod_le_margem"+(i+1);        
//         container.appendChild(margem_nod_le); 
               
        
//         // como criar as labels
//         var focoEcogenico = document.createElement("label");
//         focoEcogenico.setAttribute("for","nod_le_focoEcogenico"+(i+1));
//         focoEcogenico.innerHTML = " Foco ecogenico: "
//         container.appendChild(focoEcogenico);

//         // como criar os selects
//         var focoEcogenico_nod_le = document.createElement("select"); 
//         focoEcogenico_nod_le.setAttribute('multiple',true); 
//         focoEcogenico_nod_le.setAttribute("onchange","tirads_le()");        
//         focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Ausente');
//         focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Artefato em cauda de cometa');
//         focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Macrocalcificações');
//         focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Calcificações periféricas');
//         focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Microcalcificações');
//         focoEcogenico_nod_le.id = "nod_le_focoEcogenico"+(i+1);        
//         container.appendChild(focoEcogenico_nod_le);
        
//         // como criar as labels
//         var localizacao = document.createElement("label");
//         localizacao.setAttribute("for","nod_le_localizacao"+(i+1));
//         localizacao.innerHTML = " Localização: "
//         container.appendChild(localizacao);

//         // como criar os selects
//         var localizacao_nod_le = document.createElement("select");                    
//         localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço superior');
//         localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço médio/superior');
//         localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço médio');
//         localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço médio/inferior');
//         localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço inferior');
//         localizacao_nod_le.id = "nod_le_localizacao"+(i+1);        
//         container.appendChild(localizacao_nod_le); 

//         // como criar as labels
//         var medida = document.createElement("label");
//         medida.setAttribute("for","nod_le_medida"+(i+1));
//         medida.innerHTML = " Medidas: "
//         container.appendChild(medida);

//         // criar o input medidas
//         var medida_nod_le = document.createElement("input"); 
//         medida_nod_le.id = "medida_nod_le"+(i+1);  
//         container.appendChild(medida_nod_le);  
        
//         // como criar as labels
//         var tirads_pont = document.createElement("label");
//         tirads_pont.setAttribute("id","tirads_le"+(i+1));
//         tirads_pont.innerHTML = " TI-RADS:"
//         container.appendChild(tirads_pont);



//         container.appendChild(document.createElement("br"));   

// } 




// }
// }
// }

// function criar_nodulos_le(){


//     if(document.getElementById("nod_le").checked){
//         var qtos_nod_le = document.getElementById("qtos_nod_le").value;
//         var container = document.getElementById("nod_le_desc");
    
//         while (container.hasChildNodes()){
//             container.removeChild(container.lastChild);
//         }
//         for (i=0;i<qtos_nod_le;i++){
//             container.appendChild(document.createTextNode("N"+(i+1)+": "));
    
//             // como criar as labels
//             var composicaoLabel = document.createElement("label");
//             composicaoLabel.setAttribute("for","nod_le_composicao"+(i+1));
//             composicaoLabel.innerHTML = "Composição:"
//             container.appendChild(composicaoLabel);
            
//             // como criar os selects
//             var composicao = document.createElement("select");
//             composicao.setAttribute("onchange","tirads_le()");
//             composicao.options[composicao.options.length] = new Option('Cístico');
//             composicao.options[composicao.options.length] = new Option('Predominantemente cístico');
//             composicao.options[composicao.options.length] = new Option('Espongiforme');
//             composicao.options[composicao.options.length] = new Option('Sólido-cístico');
//             composicao.options[composicao.options.length] = new Option('Predominentemente sólido');
//             composicao.options[composicao.options.length] = new Option('Sólido');
//             composicao.id = "nod_le_composicao"+(i+1);
            
//             container.appendChild(composicao);
    
//             // como criar as labels
//             var ecogenicidade = document.createElement("label");
//             ecogenicidade.setAttribute("for","nod_le_ecogenicidade"+(i+1));
//             ecogenicidade.innerHTML = " Ecogenicidade: "
//             container.appendChild(ecogenicidade);
    
//             // como criar os selects
//             var ecogenicidade_nod_le = document.createElement("select");
//             ecogenicidade_nod_le.setAttribute("onchange","tirads_le()");
//             ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Anecóico');
//             ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Isoecóico');
//             ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Hiperecóico');
//             ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Hipoecóico');
//             ecogenicidade_nod_le.options[ecogenicidade_nod_le.options.length] = new Option('Acentuada hipoecogenicidade');
//             ecogenicidade_nod_le.id = "nod_le_ecogenicidade"+(i+1);        
//             container.appendChild(ecogenicidade_nod_le);
    
//             // como criar as labels
//             var forma = document.createElement("label");
//             forma.setAttribute("for","nod_le_forma"+(i+1));
//             forma.innerHTML = " Forma: "
//             container.appendChild(forma);
    
//             // como criar os selects
//             var forma_nod_le = document.createElement("select");
//             forma_nod_le.setAttribute("onchange","tirads_le()");
//             forma_nod_le.options[forma_nod_le.options.length] = new Option('mais largo que alto');
//             forma_nod_le.options[forma_nod_le.options.length] = new Option('mais alto que largo');
//             forma_nod_le.id = "nod_le_forma"+(i+1);        
//             container.appendChild(forma_nod_le);            
            
//             // como criar as labels
//             var margem = document.createElement("label");
//             margem.setAttribute("for","nod_le_margem"+(i+1));
//             margem.innerHTML = " Margem: "
//             container.appendChild(margem);
    
//             // como criar os selects
//             var margem_nod_le = document.createElement("select");
//             margem_nod_le.setAttribute("onchange","tirads_le()");
//             margem_nod_le.options[margem_nod_le.options.length] = new Option('Regular');
//             margem_nod_le.options[margem_nod_le.options.length] = new Option('Mal definida');
//             margem_nod_le.options[margem_nod_le.options.length] = new Option('Irregular');
//             margem_nod_le.options[margem_nod_le.options.length] = new Option('Lobulada');
//             margem_nod_le.options[margem_nod_le.options.length] = new Option('Extensão extra-tireoideana');
//             margem_nod_le.id = "nod_le_margem"+(i+1);        
//             container.appendChild(margem_nod_le); 
                   
            
//             // como criar as labels
//             var focoEcogenico = document.createElement("label");
//             focoEcogenico.setAttribute("for","nod_le_focoEcogenico"+(i+1));
//             focoEcogenico.innerHTML = " Foco ecogenico: "
//             container.appendChild(focoEcogenico);
    
//             // como criar os selects
//             var focoEcogenico_nod_le = document.createElement("select"); 
//             focoEcogenico_nod_le.setAttribute('multiple',true); 
//             focoEcogenico_nod_le.setAttribute("onchange","tirads_le()");        
//             focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Ausente');
//             focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Artefato em cauda de cometa');
//             focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Macrocalcificações');
//             focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Calcificações periféricas');
//             focoEcogenico_nod_le.options[focoEcogenico_nod_le.options.length] = new Option('Microcalcificações');
//             focoEcogenico_nod_le.id = "nod_le_focoEcogenico"+(i+1);        
//             container.appendChild(focoEcogenico_nod_le);
            
//             // como criar as labels
//             var localizacao = document.createElement("label");
//             localizacao.setAttribute("for","nod_le_localizacao"+(i+1));
//             localizacao.innerHTML = " Localização: "
//             container.appendChild(localizacao);
    
//             // como criar os selects
//             var localizacao_nod_le = document.createElement("select");                    
//             localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço superior');
//             localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço médio/superior');
//             localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço médio');
//             localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço médio/inferior');
//             localizacao_nod_le.options[localizacao_nod_le.options.length] = new Option('terço inferior');
//             localizacao_nod_le.id = "nod_le_localizacao"+(i+1);        
//             container.appendChild(localizacao_nod_le); 

//             // como criar as labels
//             var medida = document.createElement("label");
//             medida.setAttribute("for","nod_le_medida"+(i+1));
//             medida.innerHTML = " Medidas: "
//             container.appendChild(medida);

//             // criar o input medidas
//             var medida_nod_le = document.createElement("input"); 
//             medida_nod_le.id = "medida_nod_le"+(i+1);  
//             container.appendChild(medida_nod_le);  
            
//             // como criar as labels
//             var tirads_pont = document.createElement("label");
//             tirads_pont.setAttribute("id","tirads_le"+(i+1));
//             tirads_pont.innerHTML = " TI-RADS:"
//             container.appendChild(tirads_pont);
    
    
    
//             container.appendChild(document.createElement("br"));   

//     }
        




// }
// }

// function criar_nodulos_ist(){


//     if(document.getElementById("nod_ist").checked){
//         var qtos_nod_ist = document.getElementById("qtos_nod_ist").value;
//         var container = document.getElementById("nod_ist_desc");
    
//         while (container.hasChildNodes()){
//             container.removeChild(container.lastChild);
//         }
//         for (i=0;i<qtos_nod_ist;i++){
//             container.appendChild(document.createTextNode("N"+(i+1)+": "));
    
//             // como criar as labels
//             var composicaoLabel = document.createElement("label");
//             composicaoLabel.setAttribute("for","nod_ist_composicao"+(i+1));
//             composicaoLabel.innerHTML = "Composição:"
//             container.appendChild(composicaoLabel);
            
//             // como criar os selects
//             var composicao = document.createElement("select");
//             composicao.setAttribute("onchange","tirads_ist()");
//             composicao.options[composicao.options.length] = new Option('Cístico');
//             composicao.options[composicao.options.length] = new Option('Predominantemente cístico');
//             composicao.options[composicao.options.length] = new Option('Espongiforme');
//             composicao.options[composicao.options.length] = new Option('Sólido-cístico');
//             composicao.options[composicao.options.length] = new Option('Predominentemente sólido');
//             composicao.options[composicao.options.length] = new Option('Sólido');
//             composicao.id = "nod_ist_composicao"+(i+1);
            
//             container.appendChild(composicao);
    
//             // como criar as labels
//             var ecogenicidade = document.createElement("label");
//             ecogenicidade.setAttribute("for","nod_ist_ecogenicidade"+(i+1));
//             ecogenicidade.innerHTML = " Ecogenicidade: "
//             container.appendChild(ecogenicidade);
    
//             // como criar os selects
//             var ecogenicidade_nod_ist = document.createElement("select");
//             ecogenicidade_nod_ist.setAttribute("onchange","tirads_ist()");
//             ecogenicidade_nod_ist.options[ecogenicidade_nod_ist.options.length] = new Option('Anecóico');
//             ecogenicidade_nod_ist.options[ecogenicidade_nod_ist.options.length] = new Option('Isoecóico');
//             ecogenicidade_nod_ist.options[ecogenicidade_nod_ist.options.length] = new Option('Hiperecóico');
//             ecogenicidade_nod_ist.options[ecogenicidade_nod_ist.options.length] = new Option('Hipoecóico');
//             ecogenicidade_nod_ist.options[ecogenicidade_nod_ist.options.length] = new Option('Acentuada hipoecogenicidade');
//             ecogenicidade_nod_ist.id = "nod_ist_ecogenicidade"+(i+1);        
//             container.appendChild(ecogenicidade_nod_ist);
    
//             // como criar as labels
//             var forma = document.createElement("label");
//             forma.setAttribute("for","nod_ist_forma"+(i+1));
//             forma.innerHTML = " Forma: "
//             container.appendChild(forma);
    
//             // como criar os selects
//             var forma_nod_ist = document.createElement("select");
//             forma_nod_ist.setAttribute("onchange","tirads_ist()");
//             forma_nod_ist.options[forma_nod_ist.options.length] = new Option('mais largo que alto');
//             forma_nod_ist.options[forma_nod_ist.options.length] = new Option('mais alto que largo');
//             forma_nod_ist.id = "nod_ist_forma"+(i+1);        
//             container.appendChild(forma_nod_ist);            
            
//             // como criar as labels
//             var margem = document.createElement("label");
//             margem.setAttribute("for","nod_ist_margem"+(i+1));
//             margem.innerHTML = " Margem: "
//             container.appendChild(margem);
    
//             // como criar os selects
//             var margem_nod_ist = document.createElement("select");
//             margem_nod_ist.setAttribute("onchange","tirads_ist()");
//             margem_nod_ist.options[margem_nod_ist.options.length] = new Option('Regular');
//             margem_nod_ist.options[margem_nod_ist.options.length] = new Option('Mal definida');
//             margem_nod_ist.options[margem_nod_ist.options.length] = new Option('Irregular');
//             margem_nod_ist.options[margem_nod_ist.options.length] = new Option('Lobulada');
//             margem_nod_ist.options[margem_nod_ist.options.length] = new Option('Extensão extra-tireoideana');
//             margem_nod_ist.id = "nod_ist_margem"+(i+1);        
//             container.appendChild(margem_nod_ist); 
                   
            
//             // como criar as labels
//             var focoEcogenico = document.createElement("label");
//             focoEcogenico.setAttribute("for","nod_ist_focoEcogenico"+(i+1));
//             focoEcogenico.innerHTML = " Foco ecogenico: "
//             container.appendChild(focoEcogenico);
    
//             // como criar os selects
//             var focoEcogenico_nod_ist = document.createElement("select"); 
//             focoEcogenico_nod_ist.setAttribute('multiple',true); 
//             focoEcogenico_nod_ist.setAttribute("onchange","tirads_ist()");        
//             focoEcogenico_nod_ist.options[focoEcogenico_nod_ist.options.length] = new Option('Ausente');
//             focoEcogenico_nod_ist.options[focoEcogenico_nod_ist.options.length] = new Option('Artefato em cauda de cometa');
//             focoEcogenico_nod_ist.options[focoEcogenico_nod_ist.options.length] = new Option('Macrocalcificações');
//             focoEcogenico_nod_ist.options[focoEcogenico_nod_ist.options.length] = new Option('Calcificações periféricas');
//             focoEcogenico_nod_ist.options[focoEcogenico_nod_ist.options.length] = new Option('Microcalcificações');
//             focoEcogenico_nod_ist.id = "nod_ist_focoEcogenico"+(i+1);        
//             container.appendChild(focoEcogenico_nod_ist);
            
//             // como criar as labels
//             var localizacao = document.createElement("label");
//             localizacao.setAttribute("for","nod_ist_localizacao"+(i+1));
//             localizacao.innerHTML = " Localização: "
//             container.appendChild(localizacao);
    
//             // como criar os selects
//             var localizacao_nod_ist = document.createElement("select");                    
//             localizacao_nod_ist.options[localizacao_nod_ist.options.length] = new Option('terço superior');
//             localizacao_nod_ist.options[localizacao_nod_ist.options.length] = new Option('terço médio/superior');
//             localizacao_nod_ist.options[localizacao_nod_ist.options.length] = new Option('terço médio');
//             localizacao_nod_ist.options[localizacao_nod_ist.options.length] = new Option('terço médio/inferior');
//             localizacao_nod_ist.options[localizacao_nod_ist.options.length] = new Option('terço inferior');
//             localizacao_nod_ist.id = "nod_ist_localizacao"+(i+1);        
//             container.appendChild(localizacao_nod_ist); 

//             // como criar as labels
//             var medida = document.createElement("label");
//             medida.setAttribute("for","nod_ist_medida"+(i+1));
//             medida.innerHTML = " Medidas: "
//             container.appendChild(medida);

//             // criar o input medidas
//             var medida_nod_ist = document.createElement("input"); 
//             medida_nod_ist.id = "medida_nod_ist"+(i+1);  
//             container.appendChild(medida_nod_ist);  
            
//             // como criar as labels
//             var tirads_pont = document.createElement("label");
//             tirads_pont.setAttribute("id","tirads_ist"+(i+1));
//             tirads_pont.innerHTML = " TI-RADS:"
//             container.appendChild(tirads_pont);
    
    
    
//             container.appendChild(document.createElement("br"));   

//     }
        




// }

















//     var qtos_nod_lds = document.getElementById("qtos_nod_lds").value;
//     var container = document.getElementById("nod_lds_desc");

//     while (container.hasChildNodes()){
//         container.removeChild(container.lastChild);
//     }
//     for (i=0;i<qtos_nod_lds;i++){
//         container.appendChild(document.createTextNode("M"+(i+1)+": "));

//         // como criar as labels
//         var paredeLabel = document.createElement("label");
//         paredeLabel.setAttribute("for","nod_ld_parede"+(i+1));
//         paredeLabel.innerHTML = "Parede:"
//         container.appendChild(paredeLabel);
        
//         // como criar os selects
//         var parede = document.createElement("select");
//         parede.options[parede.options.length] = new Option('Anterior');
//         parede.options[parede.options.length] = new Option('Posterior');
//         parede.options[parede.options.length] = new Option('Lateral esquerda');
//         parede.options[parede.options.length] = new Option('Lateral direita');
//         parede.id = "nod_ld_parede"+(i+1);
        
//         container.appendChild(parede);

//         // como criar as labels
//         var tipo = document.createElement("label");
//         tipo.setAttribute("for","nod_ld_tipo"+(i+1));
//         tipo.innerHTML = " Tipo: "
//         container.appendChild(tipo);

//         // como criar os selects
//         var tipo_nod_ld = document.createElement("select");
//         tipo_nod_ld.options[tipo_nod_ld.options.length] = new Option('Intramural');
//         tipo_nod_ld.options[tipo_nod_ld.options.length] = new Option('Intramural/Subseroso');
//         tipo_nod_ld.options[tipo_nod_ld.options.length] = new Option('Submucoso');
//         tipo_nod_ld.options[tipo_nod_ld.options.length] = new Option('Intramural/Submucoso');
//         tipo_nod_ld.options[tipo_nod_ld.options.length] = new Option('Subseroso');
//         tipo_nod_ld.options[tipo_nod_ld.options.length] = new Option('Pediculado');
//         tipo_nod_ld.id = "nod_ld_tipo"+(i+1);        
//         container.appendChild(tipo_nod_ld);

//         // como criar as labels
//         var medida_nod_ld = document.createElement("label");
//         medida_nod_ld.setAttribute("for","nod_ld_medidas"+(i+1));
//         medida_nod_ld.innerHTML = " Medindo: "
//         container.appendChild(medida_nod_ld);

//         // medidas dos nod_lds
//         var medida_nod_ld = document.createElement("input");
//         medida_nod_ld.type = "text";        
//         medida_nod_ld.id = "nod_ld_medidas"+(i+1);
//         container.appendChild(medida_nod_ld);

//         // var input = document.createElement("input");
//         // input.type = "text";
//         // input.id = "nod_ld_"+(i+1);
//         // container.appendChild(input);

//         container.appendChild(document.createElement("br"));
//     }
// 

