

let listObj = [];
let originalList = [];

//Variables
const content = document.querySelector('.content');
const filtersDiv = document.querySelector('.filters');


addEventListener('DOMContentLoaded', bringData);

class AdminFilter{

    constructor(){
        this.jobs = [];
        this.tags = [];
    }

    Create(tag){
        cleanHTML();
        this.tags = [...this.tags, tag.textContent]; 
        this.tags = [...new Set(this.tags)]; /* New Set evita los duplicados */

        //Aparecemos el div de filters
        filtersDiv.style.display = 'grid';

        //Creamos el nuevo elemento filter
        const filtersContainer = document.createElement('div'); 
        filtersContainer.classList.add('filter');

        const filtersClear = document.createElement('div');
        filtersClear.classList.add('clear');
        const filtersClearText = document.createElement('P');
        filtersClearText.textContent = 'Clear';
        filtersClearText.classList.add('clear__text');


        //Se agrega el nuevo elemento al html
        filtersDiv.appendChild(filtersContainer);
        filtersDiv.appendChild(filtersClear);
        filtersClear.appendChild(filtersClearText);

        //Hacemos que sean elementos "P" a donde se asigne el texto
        this.tags.forEach( tag =>{
            const tagText = document.createElement('div');
            tagText.classList.add('filter__tag');

            const tagTextText = document.createElement('P');
            tagTextText.textContent = tag;
            tagTextText.classList.add('filter__tagContent');
            
            const tagIcon = document.createElement('IMG');
            tagIcon.src =  `../build/images/icon-remove.svg`;
            tagIcon.classList.add('filter__icon');

          
            filtersContainer.appendChild(tagText);
            tagText.appendChild(tagTextText);
            tagText.appendChild(tagIcon);

    
        })

        this.read();
          
        
    }

    read(){
       listObj.forEach(itemList =>{

        const tags = [...itemList.languages, ...itemList.tools, itemList.level, itemList.role];
    
        /*Unimos a cada itemList el array Tags que contiene todos los tags con los que se pueden filtrar */
        itemList.totalTags = tags;
       })

       this.update();

        /* PASOS NECESARIOS PARA EL ARRAY
            1. RECORRER LISTA DE THIS.TAGS; listo
            2. COMPARAR QUE ELEMETOS DE THIS.TAGS SON IGUALES A LOS ARRAYS LANGUAGES Y TOOLS 
            3. LOS ELEMENTOS RESULTANTES SE ASIGNAN A THIS.JOBS
            4. SE FILTRA EL HTML DE ACUERDO A THIS.JOBS
            
            */
    }

   
    update(){
        this.jobs = originalList.filter(list => 
            this.tags.every(tag=> list.totalTags.includes(tag))
        );

        


        listObj = [...this.jobs];
        console.log(listObj);


        console.log(this.jobs);
      /*   listObj = this.jobs; */
        
        

        removeContent();
        showHTML();
        assingEventsToTag();
        this.clear();
    }

  
    delete(){

    }
    
    clear(){
        const clearButton = document.querySelector('.clear__text');


        clearButton.addEventListener('click', ()=>{
  
           this.tags = [];
           this.update();

           const filter = document.querySelector('.filter');
           const filters = document.querySelector('.filters');
           filters.style.display = 'none';

           while(filter.firstChild){
            filter.removeChild(filter.lastChild);
           }

           /* document.querySelector('.filter__tagContent').remove(); */


           /* 
           function removeContent(){
    while(content.firstChild){
        content.removeChild(content.lastChild);
    }
}
           
           
           */
        } )
    }


}


const filtros = new AdminFilter();


/*1. obtener los datos del json  */
 function bringData() {
    fetch('../data.json') //Carga el archivo JSON
    .then (respuesta => respuesta.json()) //Lo convierte a objeto JS
    .then (data =>{ //usamos js para recorrrerlo

        originalList =  data;
        listObj = [...originalList];
        showHTML()
        const tagAttribute = document.querySelectorAll('.tag__attribute');


        tagAttribute.forEach(tag=>{
        
            tag.addEventListener('click', selectTag);
        })
   

    })


}

//Create the HTML Cards
function showHTML(){
    
    listObj.forEach( card =>{ 

        const course = document.createElement('DIV');
        course.classList.add('course');

        /* Creamos los tags New Y featured */
        const nameTag = document.createElement('P');
        const nameTagfeatured = document.createElement('P');
        

        /* Logo */
        const logoHTML = document.createElement('img');
        logoHTML.classList.add('course__photo');
        logoHTML.src =  `../build${card.logo.replace(".", "")}`;
        logoHTML.alt = `${card.company} logo`;

        /* SectionName */
        const name = document.createElement('SECTION');
        name.classList.add('name');
        
        const nameCourse = document.createElement('H1');
        nameCourse.classList.add('name__course');
        nameCourse.textContent = `${card.company}`
      
        if(card.new == true){
            nameTag.classList.add('name__tag');
            nameTag.textContent = 'New';
            
        }

          if(card.featured == true){
            nameTagfeatured.classList.add('name__tag', 'name__tag--featured');
            nameTagfeatured.textContent = 'Featured';
            
        }

        const description = document.createElement('SECTION');
        description.classList.add('description');

        const descriptionTitle = document.createElement('H2');
        descriptionTitle.classList.add('description__title');
        descriptionTitle.textContent = `${card.position}`;

        /* Atributes */
        const attributes = document.createElement('DIV');
        attributes.classList.add('attributes');

        const attributePosted = document.createElement('P');
        attributePosted.classList.add('attributes__description');
        attributePosted.textContent = `${card.postedAt}`;

        const attributeContract = document.createElement('P');
        attributeContract.classList.add('attributes__description');
        attributeContract.textContent = `${card.contract}`;

        const attributeLocation = document.createElement('P');
        attributeLocation.classList.add('attributes__description');
        attributeLocation.textContent = `${card.location}`;

        /* Tags */

        const tags = document.createElement('section');
        tags.classList.add('tag');

        const tagRole = document.createElement('p');
        tagRole.classList.add('tag__attribute');
        tagRole.textContent = `${card.role}`

        const tagLevel = document.createElement('p');
        tagLevel.classList.add('tag__attribute');
        tagLevel.textContent = `${card.level}`

        card.languages.forEach(language =>{
            const tagLanguage = document.createElement('P');
            tagLanguage.classList.add('tag__attribute');
            tagLanguage.textContent = language;
            tags.appendChild(tagLanguage);
        })

        card.tools.forEach(tool =>{
            
            const tagTools = document.createElement('P');
            tagTools.classList.add('tag__attribute');
            tagTools.textContent = tool;
            tags.appendChild(tagTools);
        })

        content.appendChild(course);
        course.appendChild(logoHTML);

        course.appendChild(name);
        name.appendChild(nameCourse);

        name.appendChild(nameTag);
        name.appendChild(nameTagfeatured);

        course.appendChild(description);
        description.appendChild(descriptionTitle);

        description.appendChild(attributes);
        attributes.appendChild(attributePosted);
        attributes.appendChild(attributeContract);
        attributes.appendChild(attributeLocation);
        
        course.appendChild(tags);
        tags.appendChild(tagRole);
        tags.appendChild(tagLevel);
        

  
    })

   
}

function selectTag(e){
    filtros.Create(e.target);   
}
function cleanHTML(){

    while(filtersDiv.firstChild){
     filtersDiv.removeChild(filtersDiv.firstChild) 
    }  
}
function removeContent(){
    while(content.firstChild){
        content.removeChild(content.lastChild);
    }
}
function assingEventsToTag(){
    const tagAttribute = document.querySelectorAll('.tag__attribute');

    tagAttribute.forEach(tag =>{
        tag.addEventListener('click', selectTag);
    })
}