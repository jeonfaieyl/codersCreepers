$(function () {

	$.ajax({
		'url': '../../PHPCodes/SMIS/FillSalesOrderCustomers.php',
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

	$('#selectCustomer').on('change', function() {
		var priceLevelId = $(this).val();

		$('#priceLevelId').text(priceLevelId);
	});

	function handleSearchInput() {
		clearTimeout(searchTimeout);
		const searchTerm = $(this).val().trim();

		const priceLevelId = $('#selectCustomer').val();

		const shouldSearch = searchTerm.length >= MIN_SEARCH_LENGTH;
		if (!shouldSearch) {
			clearResults();
			return;
		}

		searchTimeout = setTimeout(() => {
			performSearch(searchTerm, priceLevelId);
		}, DEBOUNCE_DELAY);
	}

	function clearResults() {
		$('#resultsBody').empty();
		// $('#loading').hide();
	}

	function performSearch(searchTerm, priceLevelId) {
		if (!priceLevelId) {
			alert("Apply customer first!");
			$('#searchInput').val('');
			return;
		}

		$.ajax({
			url: '../../PHPCodes/SMIS/SalesOrderDataTable.php',
			type: 'GET',
			dataType: 'json',
			data: {
				search: searchTerm,
				priceLevelId: priceLevelId
			},
			success: handleSearchSuccess,
			error: handleSearchError
		});
	}

	function handleSearchSuccess(response) {
		if (response.error) {
			showError('Error loading data: ' + error);
			return;
		}

		displayResults(response);
	}

	function handleSearchError(xhr, status, error) {
		showError('Error loading data: ' + error);
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
		const itemId = row[13];
		const isSelected = selectedItems.has(itemId);

        const tr = $('<tr>').addClass('clickable-row');

        const selectCell = $('<td>').addClass('select-cell');
        if (isSelected) {
        	selectCell.html('<span class="selected-check">check</span>');
        	tr.addClass('selected-row');
        	// initializeDataTable();
        } else {
        	selectCell.html('<span class="select-indicator">+</span>');
        }
        tr.append(selectCell);



        tr.append($('<td>').text(row[0]).addClass('item-code'));
        tr.append($('<td>').text(row[1]));
        tr.append(row[2]);
        tr.append(row[3]);

        tr.append(row[4]);
        tr.append($('<td>' + row[5] + '</td>'));
        tr.append($('<td>').text(row[6]));
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
        	expiryDate: row[3],
        	quantity: row[4],
			unitOfMeasure: row[5], 
			unitPrice: row[6],
			amount: row[7],
			tax: row[8],
			unserve: row[9],
			returnIndicated: row[10],
			expiryDate1: row[11],
			batchNo1: row[12],
			id: row[13]
        });
        
        return tr;
    }

    function initializeDataTable() {
    table = $('#resultsTable').DataTable({
        paging: false,
        pageLength: 10,
        searching: false,
        ordering: true,
        info: false,
        autoWidth: false,
        destroy: true, // Allow re-initialization
        columnDefs: [
            { orderable: false, targets: 0 }, // Make checkbox column not sortable
            { className: 'dt-center', targets: 0 } // Center the checkbox column
        ],
        createdRow: function(row, data, dataIndex) {
            $(row).addClass('clickable-row');
            
            // Get the actual item id from the row data
            const rowElement = $(row);
            const itemData = rowElement.data('item-data');
            if (itemData && itemData.id && selectedItems.has(itemData.id)) {
                rowElement.addClass('selected-row');
                rowElement.find('.select-cell').html('<span class="selected-check">✓</span>');
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
        const itemData = row.data('item-data');
        const itemId = itemData.id;
        
        toggleItemSelection(row, itemId, itemData);
    });
}


function toggleItemSelection(row, itemId, itemData) {
    if (selectedItems.has(itemId)) {
        // Remove from selection
        selectedItems.delete(itemId);
        row.removeClass('selected-row');
        row.find('.select-cell').html('<span class="select-indicator">+</span>');
    } else {
        // Add to selection
        selectedItems.set(itemId, {
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
    // if (!panel.length) {
    //     // Create selection panel if it doesn't exist
    //     createSelectionPanel();
    // }
    
    const selectedList = $('#selectedResultsBody');
    selectedList.empty();
    
    if (selectedItems.size === 0) {
        selectedList.html('<div class="empty-selection">No items selected</div>');
        $('#selectedCount').text('0');
        return;
    }
    
    $('#selectedCount').text(selectedItems.size);
    
    selectedItems.forEach((item, itemId) => {
    	// console.log(item.id);
        const itemDiv = $(`
            <tr id="selected" class="selected-row">
                <td>${item.code}</td>
                <td>${item.description}</td>
                ${item.batchNo}
                ${item.expiryDate}
                ${item.quantity}
                <td>${item.unitOfMeasure}</td>
                <td>${item.unitPrice}</td>
                ${item.amount}
                ${item.tax}
                ${item.unserve}
                ${item.returnIndicated}
                ${item.expiryDate1}
                ${item.batchNo1}
                <td><button class="remove-item" data-id="${itemId}">×</button></td>
            </tr>
        `);
        selectedList.append(itemDiv);
    });
    
    // Attach remove handlers
    $('.remove-item').off('click').on('click', function(e) {
        e.stopPropagation();
        const itemId = $(this).data('id');
        selectedItems.delete(itemId);
        // console.log(itemId);
        removeSelectedItem(itemId);
    });
}

// NEW: Remove selected item
function removeSelectedItem(itemId) {
    selectedItems.delete(String(itemId));
    // console.log(itemId);
    // $('#selected').remove();
    // Find and update the table row using the item id
    $('#resultsTable tbody tr').each(function() {
    	// $('#selected').remove();
    	const row = $(this);
    	const itemData = row.data('item-data');
    	if (itemData.id == itemId) {
    		row.removeClass('selected-row');
        	row.find('.select-cell').html('<span class="select-indicator">+</span>');
    	}
    });
    
    updateSelectionPanel();
}

// NEW: Get all selected items
function getSelectedItems() {
    return Array.from(selectedItems.values());
}

// NEW: Check if item is selected
function isItemSelected(itemId) {
    return selectedItems.has(itemId);
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
