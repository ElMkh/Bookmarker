
// html elements
const siteName = document.getElementById("siteName")
const siteUrl = document.getElementById("siteUrl")
const tableContent = document.getElementById("tableContent")
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

const nameRegex = /^[A-Za-z ]{3,}$/ ;
const urlRegex =/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/ ;

let siteList = JSON.parse(localStorage.getItem("site")) || [];
displayAllUrls()

// functions

function addUrl(){
    if(validate(nameRegex,siteName)&&validate(urlRegex,siteUrl)){
        let site = {
            name: siteName.value.toLowerCase() ,
            link: siteUrl.value.toLowerCase() 
        }  
        siteList.push(site);
        localStorage.setItem("site",JSON.stringify(siteList));
        displayUrl(siteList.length-1)
        clearInputs()
    }else{
        myModal.show(); 
    }
    
}

function displayUrl(index){
    let urlHtml = `<tr>
                        <td>${index+1}</td>
                        <td>${siteList[index].name}</td>
                        <td>
                            <button class="btn btn-visit pe-2" onclick="visitUrl(${index})"> 
                                <i class="fa-regular fa-eye"></i> Visit
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-delete pe-2" onclick="deleteUrl(${index})"> 
                                <i class="fa-solid fa-trash-can"></i> Delete
                            </button>
                        </td>
                    </tr>`;
    tableContent.innerHTML += urlHtml ;

}

function displayAllUrls(){
    for (let i = 0; i < siteList.length; i++) {
        displayUrl(i);   
    }
}

function clearInputs(){
    siteName.value = "";
    siteName.classList.remove("is-valid","is-invalid");
    siteUrl.value = "";
    siteUrl.classList.remove("is-valid","is-invalid")
}

function deleteUrl(i){
    siteList.splice(i , 1)
    localStorage.setItem("site",JSON.stringify(siteList))
    tableContent.innerHTML = "";
    displayAllUrls();
}

function visitUrl(i){
    open(siteList[i].link , "_blank")   
}

function validate(regex,element){
    if(regex.test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.add("d-none")
        return true;
    }
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.nextElementSibling.classList.remove("d-none")
        return false ; 
    
}

