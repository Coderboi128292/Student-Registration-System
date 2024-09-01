const form = document.querySelector("form");
const tableContainer = document.getElementById("Table-Container");
const table = document.getElementById("Table").getElementsByTagName("tbody")[0];
const registrationButton = document.querySelector("#registration-Btn");
const detailsButton = document.querySelector("#Details-Btn");


// Initially hide the table when the page loads.
tableContainer.style.display = "none";

// Registration Form button to display the registration form and hide the student details table
    registrationButton.addEventListener("click", () => {
    form.style.display = "flex";
    tableContainer.style.display = "none";
});

// Student Details button to display the student details table and hide the registration form
    detailsButton.addEventListener("click", () => {
    form.style.display = "none";
    tableContainer.style.display = "block";
});

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit

    const studentName = document.getElementById("Name").value;
    const studentID = document.getElementById("ID").value;
    const rollNo = document.getElementById("Roll-No.").value;
    const studentClass = document.getElementById("Class").value;
    const studentGender = document.querySelector("input[name='gender']:checked").value;
    const studentContact = document.getElementById("Contact-No.").value;
    const studentEmail = document.getElementById("Email").value;

    // Validate input fields
    if (/\d/.test(studentName)) {
        alert("Name should not contain any numbers.");
        return;
    }
    
    if (/[a-zA-Z]/.test(studentID)) {
        alert("Student ID should contain only numbers.");
        return;
    }

    if (studentContact.length !== 10 || /\D/.test(studentContact)) {
        alert("Contact number should be exactly 10 digits and numeric only.");
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
        alert("Invalid email address.");
        return;
    }

    // Alert user after successful submission
    alert("Form submitted successfully!");

    const key = 'student_' + Date.now(); // Create a unique key for each student
    addStudentInfo(key, studentName, studentID, rollNo, studentClass, studentGender, studentContact, studentEmail);

    form.reset(); // Clear the form fields
});

// function to add a student to the table
function addStudentInfo(key, studentName, studentID, rollNo, studentClass, studentGender, studentContact, studentEmail) {
    const newRow = table.insertRow(); // Insert a new row in the table

    // Create and fill table cells
    const cell1 = newRow.insertCell(0);
    cell1.className = "border-r border-b border-white py-2 px-4";  // border-r adds a border at the right side of an element
                                                                   // border-b adds a border at the bottom of an element
    const cell2 = newRow.insertCell(1);
    cell2.className = "border-r border-b border-white py-2 px-4";  // py-2: Adds padding to the top and bottom of an element, 2 represents a spacing scale value
                                                                   // px-4: Adds padding to the left and right of an element, 4 represents a spacing scale value
    const cell3 = newRow.insertCell(2);
    cell3.className = "border-r border-b border-white py-2 px-4";

    const cell4 = newRow.insertCell(3);
    cell4.className = "border-r border-b border-white py-2 px-4";

    const cell5 = newRow.insertCell(4);
    cell5.className = "border-r border-b border-white py-2 px-4";

    const cell6 = newRow.insertCell(5);
    cell6.className = "border-r border-b border-white py-2 px-4";

    const cell7 = newRow.insertCell(6);
    cell7.className = "border-r border-b border-white py-2 px-4";

    const cell8 = newRow.insertCell(7);
    cell8.className = "border-r border-b border-white py-2 px-4";


    cell1.innerText = studentName;
    cell2.innerText = studentID;
    cell3.innerText = rollNo;
    cell4.innerText = studentClass;
    cell5.innerText = studentGender;
    cell6.innerText = studentContact;
    cell7.innerText = studentEmail;
    newRow.dataset.key = key; // Attach the unique key to the row for later reference

    // Store student data in local storage
    const student = {
        studentName: studentName,
        studentID: studentID,
        rollNo: rollNo,
        studentClass: studentClass,
        studentGender: studentGender,
        studentContact: studentContact,
        studentEmail: studentEmail,
    };

    localStorage.setItem(key, JSON.stringify(student)); // Save student data in local storage

    // Create and configure Edit button
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.style.borderRadius = "5px";
    editButton.style.padding = "2px";
    editButton.style.color = "black";
    editButton.style.border = "1px solid #000";
    editButton.style.backgroundColor = "white";
    editButton.addEventListener("mouseenter", () => {
    editButton.style.backgroundColor = "lightgray";
    editButton.style.color = "black";
    });
    editButton.addEventListener("mouseleave", () => {
    editButton.style.backgroundColor = "white";
    editButton.style.color = "black";
    });
    editButton.addEventListener("click", () => editStudentInfo(newRow, key));

    // Create and configure Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style.borderRadius = "5px";
    deleteButton.style.border = "1px solid #000";
    deleteButton.style.padding = "2px";
    deleteButton.style.color = "black";
    deleteButton.style.backgroundColor = "white";
    deleteButton.addEventListener("mouseenter", () => {   // for adding gray colour effect when mouse enters button
    deleteButton.style.backgroundColor = "lightgray";
    deleteButton.style.color = "black";
    });
    deleteButton.addEventListener("mouseleave", () => {  // for adding white colour effect when mouse leaves button
    deleteButton.style.backgroundColor = "white";
    deleteButton.style.color = "black";
    });

    // Deletes the row and data on button click
    deleteButton.addEventListener("click", () => deleteStudentInfo(newRow, key));

    // Add Edit and Delete buttons to the last cell
    cell8.appendChild(editButton);
    cell8.appendChild(deleteButton);
    editButton.style.marginRight = "5px"; // Space between buttons
}

function editStudentInfo(row, key) {
    // Get all table cells in the row
    const cells = row.getElementsByTagName('td');

    // Prompt the user for new values, pre-filling with current cell values
    // and store the input in corresponding variables
    const studentName = prompt("Enter new Name", cells[0].innerText);
    const studentID = prompt("Enter new Student ID", cells[1].innerText);
    const rollNo = prompt("Enter new Roll no.", cells[2].innerText);
    const studentClass = prompt("Enter new class", cells[3].innerText);
    const studentGender = prompt("Enter new gender (Male/Female)", cells[4].innerText);
    const studentContact = prompt("Enter new Contact", cells[5].innerText);
    const studentEmail = prompt("Enter new Email-ID", cells[6].innerText);

    // Validate input fields
    if (/\d/.test(studentName)) {
        alert("Name should not contain any numbers.");
        return;
    }

    if (/[a-zA-Z]/.test(studentID)) {
        alert("Student ID should contain only numbers.");
        return;
    }

    if (!["Male", "Female"].includes(studentGender)) {
        alert("Gender should be either 'Male' or 'Female'.");
        return;
    }
    
    if (/[a-zA-Z]/.test(studentContact) || studentContact.length !== 10) {
        alert("Contact number should be 10-digit numeric only.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
        alert("Invalid email address.");
        return;
    }

    // Ensure that no fields are empty
    if (studentName && studentID && rollNo && studentClass && studentGender && studentContact && studentEmail) {
        cells[0].innerText = studentName;
        cells[1].innerText = studentID;
        cells[2].innerText = rollNo;
        cells[3].innerText = studentClass;
        cells[4].innerText = studentGender;
        cells[5].innerText = studentContact;
        cells[6].innerText = studentEmail;

        // Update the local storage with new values
        const student = {
            studentName: studentName,
            studentID: studentID,
            rollNo: rollNo,
            studentClass: studentClass,
            studentGender: studentGender,
            studentContact: studentContact,
            studentEmail: studentEmail,
        };

        localStorage.setItem(key, JSON.stringify(student)); // Store the student object in local storage using the specified key
    } else {
        alert("Please fill out all fields");  // if any field is empty it gives an alert message
    }
}

function deleteStudentInfo(row, key) {
    if (confirm("Are you sure you want to delete this student details?")) {
        table.removeChild(row); // Remove the row from the table
        localStorage.removeItem(key); // Remove the student data from local storage
    }
}

// Retrieve and display student data from local storage when the page loads
window.addEventListener("DOMContentLoaded", () => {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('student_')) {
            const studentInfo = JSON.parse(localStorage.getItem(key));
            addStudentInfo(key, studentInfo.studentName, studentInfo.studentID, studentInfo.rollNo, studentInfo.studentClass, studentInfo.studentGender, studentInfo.studentContact, studentInfo.studentEmail);
        }
    });
});
