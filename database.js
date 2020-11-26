
class patient {
    patient() {
        this.pdata = []
        this.no_p = 0
    }

    addp(obj) {
        console.log("tranfered to patient db")
        this.pdata.push(obj)
        this.no_p = this.no_p + 1
        return
    }
    show() {
        return [this.pdata, this.no_p]
    }
    find(email, password) {
        var index = this.pdata.findIndex(function (obj, index) {
            if (obj.email === email) {
                if (obj.password === password) {
                    return true
                }
            }
            return false
        }
        )
        if (index === -1) {
            return false
        }
        return this.pdata[index]
    }
    findname(ip, logged_in) {
        var index = logged_in.findIndex(function (obj, index) {
            if (obj.ip === ip) {
                return true
            }
            return false
        }
        )
        if (index === -1) {
            return false
        }
        return logged_in[index]
    }
}
class doctor {

    doctor(){
        this.pdata = []
        this.no_p = 0
    }

    addp(obj) {
        console.log("tranfered to doctor db")
        this.pdata.push(obj)
        this.no_p = this.no_p + 1
        return
    }
    show() {
        return [this.pdata, this.no_p]
    }
    find(email, password) {
        var index = this.pdata.findIndex(function (obj, index) {
            if (obj.email === email) {
                if (obj.password === password) {
                    return true
                }
            }
            return false
        }
        )
        if (index === -1) {
            return false
        }
        return this.pdata[index]
    }
    findname(ip, logged_in) {
        var index = logged_in.findIndex(function (obj, index) {
            if (obj.ip === ip) {
                return true
            }
            return false
        }
        )
        if (index === -1) {
            return false
        }
        return index
    }
}
class appointmentlist{
    run(){
        this.aplist= []
    }

    push(object1)
    {
        this.aplist.push(object1)
    }

    show(ip)
    {
        var arr=[]
        this.aplist.forEach(element => {
            if(element.ip==ip)
            {
                arr.push(element)
            }

        });
        if (arr.length==0) {
            return false
        }
        arr.sort((a,b)=> a.time-b.time)
        return arr
    }

    appointmentTimeOut()
    {
        var ar=[]
        this.aplist.forEach(function(element,index){
            if(element.time<Date.now())
            {
                ar.push(index)
            }
        })
        ar.forEach(element => {
            this.aplist.splice(element,1)
        });
    }
    
}
module.exports.patient = new patient
module.exports.doctor=new doctor
module.exports.appointmentlist=new appointmentlist