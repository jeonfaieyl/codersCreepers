$(function () {

	$.ajax({
		'url': '../../PHPCodes/SMIS/FillCustomers.php',
		'async': 'false',
		success: function(data) {
			var customers = $.parseJSON(data);
			for(var i = 0; i < customers.data.length; i++) {
				$('#selectCustomer').append(customers.data[i]);
			}
		}
	});

	$.ajax({
		'url': '../../PHPCodes/SMIS/FillLocations.php',
		'async': 'false',
		success: function(data) {
			var locations = $.parseJSON(data);
			for(var i = 0; i < locations.data.length; i++) {
				$('#selectLoc').append(locations.data[i]);
			}
		}
	});

	$.ajax({
		'url': '../../PHPCodes/SMIS/FillSalesRepresentatives.php',
		'async': 'false',
		success: function(data) {
			var salesReps = $.parseJSON(data);
			for(var i = 0; i < salesReps.data.length; i++) {
				$('#selectSalesRep').append(salesReps.data[i]);
			}
		}
	});

	$.ajax({
		'url': '../../PHPCodes/SMIS/FillShipVia.php',
		'async': 'false',
		success: function(data) {
			var shipVias = $.parseJSON(data);
			for(var i = 0; i < shipVias.data.length; i++) {
				$('#selectShipVia').append(shipVias.data[i]);
			}
		}
	});

	$('#selectCustomer').select2({
		width: '100%',
		minimumInputLength: 3,
	});


	let searchTimeout;
	const MIN_SEARCH_LENGTH = 2;
	const DEBOUNCE_DELAY = 500;
	let table;
	let selectedItems = new Map();

	$('#searchInput').on('input', handleSearchInput);
    // ... all your existing AJAX calls and event handlers ...
    
    // Initialize DataTable on page load
    table = $('#resultsTable').DataTable({
        paging: true,
        pageLength: 10,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false,
        columnDefs: [
            { orderable: false, targets: 0 }
        ]
    });
    
    // Initial attachment of click handlers
    attachRowClickHandlers();

	function handleSearchInput() {
		clearTimeout(searchTimeout);
		const searchTerm = $(this).val().trim();

		const shouldSearch = searchTerm.length >= MIN_SEARCH_LENGTH;
		if (!shouldSearch) {
			clearResults();
			return;
		}

		searchTimeout = setTimeout(() => {
			performSearch(searchTerm);
		}, DEBOUNCE_DELAY);
	}

	function clearResults() {
		$('#resultsBody').empty();
		// $('#loading').hide();
	}

	function performSearch(searchTerm) {
		showLoading();

		$.ajax({
			url: '../../PHPCodes/SMIS/SalesOrderDataTable.php',
			type: 'GET',
			dataType: 'json',
			data: { search: searchTerm },
			success: handleSearchSuccess,
			error: handleSearchError
		});
	}

	function handleSearchSuccess(response) {
		hideLoading();

		if (response.error) {
			showError('Error loading data: ' + error);
			return;
		}

		displayResults(response);
	}

	function handleSearchError(xhr, status, error) {
		hideLoading();
		showError('Error loading data: ' + error);
	}

	function showLoading() {
		// $('#loading').show();
	}

	function hideLoading() {
		$('#loading').hide();
	}

	function showError(message) {
		$('#resultsBody').html(`<tr><td colspan="13">${message}</td></tr>`);
	}

	// function displayResults(response) {
	// 	const tbody = $('#resultsBody');
	// 	tbody.empty();

	// 	const hasResults = response.data && response.data.length > 0;
	// 	if (!hasResults) {
	// 		tbody.html(`<tr><td colspan="13">No results found</td></tr>`);
	// 		return;
	// 	}

	// 	populateResultsTable(response.data, tbody);
	// }

	function displayResults(response) {
		const tbody = $('#resultsBody');
		tbody.empty();

		const hasResults = response.data && response.data.length > 0;
		if (!hasResults) {
			tbody.html(`<tr><td colspan="13">No results found</td></tr>`);
			return;
		}

		if($.fn.DataTable.isDataTable('#resultsTable')) {
			table.destroy();
			$('#resultsBody').empty();
		}

		populateResultsTable(response.data);
	}

	// function populateResultsTable(data) {
	// 	const tbody = $('#resultsBody');

	// 	$.each(data, function(index, row) {
	// 		const tr = createTableRow(row);
	// 		tbody.append(tr);
	// 	});
	// }

	function populateResultsTable(data) {
    const tbody = $('#resultsBody');
    tbody.empty();

    $.each(data, function(index, row) {
        const tr = createTableRow(row);
        tbody.append(tr);
    });

    // Re-initialize DataTable after populating
    if($.fn.DataTable.isDataTable('#resultsTable')) {
        table.destroy();
    }
    
    initializeDataTable();
}

	function createTableRow(row) {
		const itemCode = row[0];
		const isSelected = selectedItems.has(itemCode);

        const tr = $('<tr>').addClass('clickable-row');

        const selectCell = $('<td>').addClass('select-cell');
        if (isSelected) {
        	selectCell.html('<span class="selected-check">check</span>');
        	tr.addClass('selected-row');
        } else {
        	selectCell.html('<span class="select-indicator">+</span>');
        }
        tr.append(selectCell);



        tr.append($('<td>').text(row[0]).addClass('item-code'));
        tr.append($('<td>').text(row[1]));
        tr.append($('<td>').text(row[2]));
        tr.append($('<td>').text(row[3]));

        tr.append(row[4]);
        tr.append($('<td>').text(row[5]));
        tr.append(row[6]);
        tr.append(row[7]);
        tr.append(row[8]);
        tr.append(row[9]);
        tr.append(row[10]);
        tr.append(row[11]);
        tr.append(row[12]);

        tr.data('item-data', {
        	code: row[0],
        	description: row[1],
        	batchNo: row[2],
        	expiryDate: row[3]
        });
        
        return tr;
    }

    function initializeDataTable() {
    table = $('#resultsTable').DataTable({
        paging: true,
        pageLength: 10,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false,
        destroy: true, // Allow re-initialization
        columnDefs: [
            { orderable: false, targets: 0 }, // Make checkbox column not sortable
            { className: 'dt-center', targets: 0 } // Center the checkbox column
        ],
        createdRow: function(row, data, dataIndex) {
            $(row).addClass('clickable-row');
            
            // Get item code from the second cell (index 1)
            const cells = $(row).find('td');
            const itemCode = $(cells[1]).text(); // Item code is in second column
            
            if (selectedItems.has(itemCode)) {
                $(row).addClass('selected-row');
                $(row).find('.select-cell').html('<span class="selected-check">✓</span>');
            }
        },
        drawCallback: function() {
            attachRowClickHandlers();
        }
    });
}

// NEW: Attach click handlers to rows
function attachRowClickHandlers() {
    $('#resultsTable tbody').off('click', 'tr').on('click', 'tr', function(e) {
        // Don't trigger if clicking on an input field
        if ($(e.target).is('input') || $(e.target).is('select') || $(e.target).is('textarea')) {
            return;
        }
        
        const row = $(this);
        const itemCode = row.find('.item-code').text();
        const itemData = row.data('item-data');
        
        toggleItemSelection(row, itemCode, itemData);
    });
}

// NEW: Toggle item selection (ActiveOne style)
function toggleItemSelection(row, itemCode, itemData) {
    if (selectedItems.has(itemCode)) {
        // Remove from selection
        selectedItems.delete(itemCode);
        row.removeClass('selected-row');
        row.find('.select-cell').html('<span class="select-indicator">+</span>');
    } else {
        // Add to selection
        selectedItems.set(itemCode, {
            ...itemData,
            rowData: row
        });
        row.addClass('selected-row');
        row.find('.select-cell').html('<span class="selected-check">✓</span>');
    }
    
    // Update selection panel
    updateSelectionPanel();
}

// NEW: Update selection panel (like ActiveOne)
function updateSelectionPanel() {
    const panel = $('#selectionPanel');
    if (!panel.length) {
        // Create selection panel if it doesn't exist
        createSelectionPanel();
    }
    
    const selectedList = $('#selectedItemsList');
    selectedList.empty();
    
    if (selectedItems.size === 0) {
        selectedList.html('<div class="empty-selection">No items selected</div>');
        $('#selectedCount').text('0');
        return;
    }
    
    $('#selectedCount').text(selectedItems.size);
    
    selectedItems.forEach((item, code) => {
        const itemDiv = $(`
            <div class="selected-item" data-code="${code}">
                <div class="item-info">
                    <strong>${code}</strong> - ${item.description}
                </div>
                <button class="remove-item" data-code="${code}">×</button>
            </div>
        `);
        selectedList.append(itemDiv);
    });
    
    // Attach remove handlers
    $('.remove-item').off('click').on('click', function(e) {
        e.stopPropagation();
        const code = $(this).data('code');
        removeSelectedItem(code);
    });
}

// NEW: Create selection panel
function createSelectionPanel() {
    const panelHtml = `
        <div id="selectionPanel" class="selection-panel">
            <div class="panel-header">
                <h4>Selected Items (<span id="selectedCount">0</span>)</h4>
                <button id="clearAll">Clear All</button>
            </div>
            <div id="selectedItemsList" class="selected-items-list">
                <div class="empty-selection">No items selected</div>
            </div>
        </div>
    `;
    
    $('#resultsTable_wrapper').after(panelHtml);
    
    // Clear all button handler
    $('#clearAll').on('click', function() {
        selectedItems.clear();
        $('.selected-row').removeClass('selected-row')
                          .find('.select-cell')
                          .html('<span class="select-indicator">+</span>');
        updateSelectionPanel();
    });
}

// NEW: Remove selected item
function removeSelectedItem(code) {
    selectedItems.delete(code);
    
    // Update table row
    $(`.item-code:contains('${code}')`).closest('tr')
        .removeClass('selected-row')
        .find('.select-cell')
        .html('<span class="select-indicator">+</span>');
    
    updateSelectionPanel();
}

// NEW: Get all selected items
function getSelectedItems() {
    return Array.from(selectedItems.values());
}

// NEW: Check if item is selected
function isItemSelected(code) {
    return selectedItems.has(code);
}

const activeOneStyles = `
<style>
    .selected-row {
        background-color: #e3f2fd !important;
    }
    
    .clickable-row {
        cursor: pointer;
    }
    
    .clickable-row:hover {
        background-color: #f5f5f5 !important;
    }
    
    .select-cell {
        width: 30px;
        text-align: center;
        font-weight: bold;
    }
    
    .selected-check {
        color: #2196F3;
    }
    
    .select-indicator {
        color: #ccc;
    }
    
    .selection-panel {
        margin-top: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 15px;
        background: #f9f9f9;
    }
    
    .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .panel-header h4 {
        margin: 0;
        color: #333;
    }
    
    #clearAll {
        background: #ff4444;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
    }
    
    .selected-items-list {
        max-height: 200px;
        overflow-y: auto;
    }
    
    .selected-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 10px;
        margin-bottom: 5px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 3px;
    }
    
    .selected-item:hover {
        background: #f0f0f0;
    }
    
    .remove-item {
        background: none;
        border: none;
        color: #ff4444;
        font-size: 18px;
        cursor: pointer;
        padding: 0 5px;
    }
    
    .empty-selection {
        color: #999;
        font-style: italic;
        text-align: center;
        padding: 20px;
    }
</style>
`;

// Inject styles
$(activeOneStyles).appendTo('head');

});