class Global {

    static async fetchData (link = window.location.href,) {
        const response = await fetch(link,{
            method:"GET",
            headers:{
                "X-Requested-With" : "XMLHttpRequest"
            }
        })
        const data = await response.json();
        return data;
    }

    static async fetchForm (form,link = window.location.href,method = "POST"){
        const response = await fetch(link,{
            method:"POST",
            body:new FormData(form),
            headers:{
                "X-HTTP-Method-Override" : method
            }
        })
        const data = await response.json();
        if(data.status === "danger"){
            alert(data.msg);
            return false;
        }
        return data;
    }

}

export default Global;