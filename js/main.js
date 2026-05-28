let users = [];

const tbody = document.querySelector(".js-userTableBody");
const fnameEl = document.querySelector(".js-fname");
const lnameEl = document.querySelector(".js-lname");
const phoneEl = document.querySelector(".js-phone");
const emailEl = document.querySelector(".js-email");
const dobEl = document.querySelector(".js-dob");
const companyEl = document.querySelector(".js-company");
const jobtypeEl = document.querySelector(".js-jobtype");
const expEl = document.querySelector(".js-exp");
const joblabelEl = document.querySelector(".js-joblabel");
const saveBtn = document.querySelector(".js-saveBtn");
const cancelBtn = document.querySelector(".js-cancelBtn");

function renderTable() {
    tbody.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td>" + u.fname + " " + u.lname + "</td>" +
            "<td>" + u.dob + "</td>" +
            "<td>" + u.phone + "</td>" +
            "<td>" + u.email + "</td>" +
            "<td>" + u.company + "</td>" +
            "<td>" + u.jobtype + "</td>" +
            "<td>" + u.exp + "</td>" +
            "<td><button class='del-btn' id='" + i + "'>&#128465;</button></td>";
        tbody.appendChild(tr);
    }
}

jobtypeEl.addEventListener("change", function() {
    joblabelEl.value = jobtypeEl.value;
});

saveBtn.addEventListener("click", function() {
    const fname   = fnameEl.value.trim();
    const lname   = lnameEl.value.trim();
    const phone   = phoneEl.value.trim();
    const email   = emailEl.value.trim();
    const dob     = dobEl.value.trim();
    const company = companyEl.value.trim();
    const jobtype = jobtypeEl.value;
    const exp     = expEl.value;

    const fields = [
        { el: fnameEl,   val: fname },
        { el: lnameEl,   val: lname },
        { el: phoneEl,   val: phone },
        { el: emailEl,   val: email },
        { el: dobEl,     val: dob },
        { el: companyEl, val: company },
        { el: jobtypeEl, val: jobtype },
        { el: expEl,     val: exp }
    ];

    let valid = true;

    for (let i = 0; i < fields.length; i++) {
        if (fields[i].val == "") {
            fields[i].el.classList.add("error");
            valid = false;
        } else {
            fields[i].el.classList.remove("error");
        }
    }

    if (!valid) {
        return;
    }

    users.push({
        fname: fname,
        lname: lname,
        dob: dob,
        phone: phone,
        email: email,
        company: company,
        jobtype: jobtype,
        exp: exp
    });

    renderTable();

    fnameEl.value   = "";
    lnameEl.value   = "";
    phoneEl.value   = "";
    emailEl.value   = "";
    dobEl.value     = "";
    companyEl.value = "";
    jobtypeEl.value = "";
    expEl.value     = "";
    joblabelEl.value = "";
});

tbody.addEventListener("click", function(e) {
    if (e.target.className == "del-btn") {
        const index = Number(e.target.id);
        users.splice(index, 1);
        renderTable();
    }
});

cancelBtn.addEventListener("click", function() {
    const allFields = [fnameEl, lnameEl, phoneEl, emailEl, dobEl, companyEl, jobtypeEl, expEl, joblabelEl];

    for (let i = 0; i < allFields.length; i++) {
        allFields[i].value = "";
        allFields[i].classList.remove("error");
    }
});

renderTable();