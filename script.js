document.addEventListener("DOMContentLoaded", function() {
    var historyBody = document.getElementById("history-body");
    var balanceElement = document.getElementById("balance");
    var addBtn = document.getElementById("add-btn");

    var data = JSON.parse(localStorage.getItem("incomeExpenseData")) || [];

    function saveData() {
        localStorage.setItem("incomeExpenseData", JSON.stringify(data));
    }

    function renderHistory() {
        historyBody.innerHTML = "";

        data.forEach(function(item) {
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.date}</td>
                <td>${item.description}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td>${item.type}</td>
            `;

            historyBody.appendChild(row);
        });
    }

    function updateBalance() {
        var balance = data.reduce(function(acc, item) {
            if (item.type === "income") {
                return acc + item.amount;
            } else {
                return acc - item.amount;
            }
        }, 0);

        balanceElement.innerText = "৳" + balance.toFixed(2);
    }

    function addIncomeExpense() {
        var description = document.getElementById("description").value;
        var amount = parseFloat(document.getElementById("amount").value);
        var type = document.getElementById("type").value;
        var date = new Date().toLocaleDateString();

        if (description !== "" && !isNaN(amount)) {
            var item = {
                description: description,
                amount: amount,
                type: type,
                date: date
            };

            data.push(item);
            saveData();
            renderHistory();
            updateBalance();

            document.getElementById("description").value = "";
            document.getElementById("amount").value = "";
        }
    }

    addBtn.addEventListener("click", addIncomeExpense);

    renderHistory();
    updateBalance();
});
