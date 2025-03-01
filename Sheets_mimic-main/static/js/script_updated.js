(function() {
    let selectedCell = null;
    let selectedRange = [];
    let isDragging = false;

    // Initialize the spreadsheet
    document.addEventListener('DOMContentLoaded', function() {
        loadSavedCells();
        setupEventListeners();
    });

    function setupEventListeners() {
        document.addEventListener('mousedown', startSelection);
        document.addEventListener('mousemove', updateSelection);
        document.addEventListener('mouseup', endSelection);
        document.addEventListener('keydown', handleKeyboardNavigation);
    }

    function startSelection(e) {
        if (e.target.tagName === 'TD') {
            isDragging = true;
            selectedRange = [e.target];
            updateCellInfo(e.target);
            highlightCell(e.target);
        }
    }

    function updateSelection(e) {
        if (isDragging && e.target.tagName === 'TD') {
            if (!selectedRange.includes(e.target)) {
                selectedRange.push(e.target);
                highlightCell(e.target);
            }
        }
    }

    function endSelection() {
        isDragging = false;
    }

    function handleKeyboardNavigation(e) {
        if (!selectedCell) return;

        const [row, col] = getCellCoordinates(selectedCell);
        let nextCell;

        switch(e.key) {
            case 'ArrowUp':
                nextCell = document.querySelector(`#cell-${row-1}-${col}`);
                break;
            case 'ArrowDown':
                nextCell = document.querySelector(`#cell-${row+1}-${col}`);
                break;
            case 'ArrowLeft':
                nextCell = document.querySelector(`#cell-${row}-${col-1}`);
                break;
            case 'ArrowRight':
                nextCell = document.querySelector(`#cell-${row}-${col+1}`);
                break;
            case 'Tab':
                e.preventDefault();
                nextCell = document.querySelector(`#cell-${row}-${col+1}`);
                break;
            case 'Enter':
                e.preventDefault();
                nextCell = document.querySelector(`#cell-${row+1}-${col}`);
                break;
        }

        if (nextCell) {
            selectCell(nextCell);
        }
    }

    function selectCell(cell) {
        clearSelection();
        selectedCell = cell;
        selectedRange = [cell];
        highlightCell(cell);
        updateCellInfo(cell);
        updateFormulaBar(cell);
    }

    function highlightCell(cell) {
        cell.classList.add('selected');
    }

    function clearSelection() {
        document.querySelectorAll('.selected').forEach(cell => {
            cell.classList.remove('selected');
        });
    }

    function updateCellInfo(cell) {
        const coords = getCellCoordinates(cell);
        document.getElementById('selected-cell').textContent = 
            String.fromCharCode(65 + coords[1]) + (coords[0] + 1);
    }

    function updateFormulaBar(cell) {
        const formulaBar = document.getElementById('formula-bar');
        formulaBar.value = cell.textContent;
    }

    function getCellCoordinates(cell) {
        const id = cell.id;
        const matches = id.match(/cell-(\d+)-(\d+)/);
        return [parseInt(matches[1]), parseInt(matches[2])];
    }

    // Formatting functions
    function formatText(style) {
        selectedRange.forEach(cell => {
            switch(style) {
                case 'bold':
                    cell.style.fontWeight = cell.style.fontWeight === 'bold' ? 'normal' : 'bold';
                    break;
                case 'italic':
                    cell.style.fontStyle = cell.style.fontStyle === 'italic' ? 'normal' : 'italic';
                    break;
                case 'underline':
                    cell.style.textDecoration = cell.style.textDecoration === 'underline' ? 'none' : 'underline';
                    break;
            }
        });
    }

    function changeFontSize() {
        const size = document.getElementById('fontSize').value;
        selectedRange.forEach(cell => {
            cell.style.fontSize = size;
        });
    }

    function changeFontColor() {
        const color = document.getElementById('fontColor').value;
        selectedRange.forEach(cell => {
            cell.style.color = color;
        });
    }

    // Data manipulation functions
    function trimText() {
        selectedRange.forEach(cell => {
            cell.textContent = cell.textContent.trim();
        });
    }

    function convertText(case_type) {
        selectedRange.forEach(cell => {
            cell.textContent = case_type === 'upper' ? 
                cell.textContent.toUpperCase() : 
                cell.textContent.toLowerCase();
        });
    }

    function autoSum() {
        if (selectedRange.length < 2) {
            alert('Please select at least two cells to sum');
            return;
        }

        const sum = selectedRange.reduce((acc, cell) => {
            const value = parseFloat(cell.textContent) || 0;
            return acc + value;
        }, 0);

        const lastCell = selectedRange[selectedRange.length - 1];
        lastCell.textContent = sum.toString();
    }

    function calculate(operation) {
        selectedRange.forEach(cell => {
            const value = parseFloat(cell.textContent);
            if (!isNaN(value)) {
                switch(operation) {
                    case 'ROUND':
                        cell.textContent = Math.round(value);
                        break;
                    case 'SQRT':
                        cell.textContent = Math.sqrt(value);
                        break;
                    case 'ABS':
                        cell.textContent = Math.abs(value);
                        break;
                }
            }
        });
    }

    function mergeCells() {
        if (selectedRange.length < 2) {
            alert('Please select at least two cells to merge');
            return;
        }

        const mergedContent = selectedRange.map(cell => cell.textContent).join(' ');
        selectedRange[0].textContent = mergedContent;
        selectedRange[0].classList.add('merged-cell');
        
        for (let i = 1; i < selectedRange.length; i++) {
            selectedRange[i].textContent = '';
        }
    }

    function sortRange() {
        const values = selectedRange.map(cell => ({
            cell: cell,
            value: cell.textContent
        }));

        values.sort((a, b) => a.value.localeCompare(b.value));
        
        values.forEach((item, index) => {
            selectedRange[index].textContent = item.value;
        });
    }

    function toggleFreeze() {
        const headerRow = document.querySelector('thead tr');
        headerRow.classList.toggle('frozen');
    }

    function highlightDuplicates() {
        const values = new Map();
        
        // First pass: count occurrences
        selectedRange.forEach(cell => {
            const value = cell.textContent;
            values.set(value, (values.get(value) || 0) + 1);
        });

        // Second pass: highlight duplicates
        selectedRange.forEach(cell => {
            const value = cell.textContent;
            if (values.get(value) > 1) {
                cell.classList.add('duplicate');
            } else {
                cell.classList.remove('duplicate');
            }
        });
    }

    function conditionalFormat() {
        selectedRange.forEach(cell => {
            const value = parseFloat(cell.textContent);
            if (!isNaN(value)) {
                cell.classList.remove('conditional-positive', 'conditional-negative');
                if (value > 0) {
                    cell.classList.add('conditional-positive');
                } else if (value < 0) {
                    cell.classList.add('conditional-negative');
                }
            }
        });
    }

    function removeDuplicates() {
        const seen = new Set();
        selectedRange.forEach(cell => {
            const value = cell.textContent;
            if (seen.has(value)) {
                cell.textContent = '';
            } else {
                seen.add(value);
            }
        });
    }

    // Save and load functions
    function saveSpreadsheet() {
        const cells = {};
        document.querySelectorAll('td').forEach(cell => {
            if (cell.textContent) {
                cells[cell.id] = {
                    content: cell.textContent,
                    style: cell.getAttribute('style') || ''
                };
            }
        });

        fetch(`/sheets/save/${SHEET_ID}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(cells)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Spreadsheet saved successfully!');
            }
        });
    }

    function loadSpreadsheet() {
        fetch(`/sheets/load/${SHEET_ID}/`)
        .then(response => response.json())
        .then(data => {
            Object.entries(data.cells).forEach(([id, cellData]) => {
                const cell = document.getElementById(id);
                if (cell) {
                    cell.textContent = cellData.content;
                    if (cellData.style) {
                        cell.setAttribute('style', cellData.style);
                    }
                }
            });
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Load saved cells on startup
    function loadSavedCells() {
        if (typeof savedCells === 'object' && savedCells !== null) {
            Object.entries(savedCells).forEach(([id, cellData]) => {
                const cell = document.getElementById(id);
                if (cell) {
                    cell.textContent = cellData.content;
                    if (cellData.style) {
                        cell.setAttribute('style', cellData.style);
                    }
                }
            });
        }
    }

    // Expose functions to global scope
    window.formatText = formatText;
    window.changeFontSize = changeFontSize;
    window.changeFontColor = changeFontColor;
    window.trimText = trimText;
    window.convertText = convertText;
    window.autoSum = autoSum;
    window.calculate = calculate;
    window.mergeCells = mergeCells;
    window.sortRange = sortRange;
    window.toggleFreeze = toggleFreeze;
    window.highlightDuplicates = highlightDuplicates;
    window.conditionalFormat = conditionalFormat;
    window.removeDuplicates = removeDuplicates;
    window.saveSpreadsheet = saveSpreadsheet;
    window.loadSpreadsheet = loadSpreadsheet;
})();
