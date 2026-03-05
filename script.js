function compressText() {
    // This alert will pop up if the button is working
    alert("System Online: Processing Data..."); 

    const inputElement = document.getElementById('inputText');
    const outputElement = document.getElementById('binaryOutput');
    const efficiencyElement = document.getElementById('efficiency');

    if (!inputElement.value) {
        alert("Please enter text!");
        return;
    }

    // SIMPLE LOGIC FOR TESTING
    let text = inputElement.value;
    let mockBinary = "";
    for (let i = 0; i < text.length; i++) {
        mockBinary += text.charCodeAt(i).toString(2);
    }

    // UPDATE UI
    outputElement.innerText = mockBinary;
    efficiencyElement.innerText = "45.5%"; // Mock value to check UI
}

