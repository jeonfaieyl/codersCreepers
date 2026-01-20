<?php
include '../Connection.php';

// Get search parameter
$search = isset($_GET['search']) ? trim($_GET['search']) : '';

// Initialize response
$resultarr = array('data' => []);

// Early return for empty search
if (empty($search)) {
    echo json_encode($resultarr);
    exit;
}

// Validate connection
if (!$conn) {
    $resultarr['error'] = 'Database connection failed';
    echo json_encode($resultarr);
    exit;
}

// Escape search term to prevent SQL injection
$escapedSearch = mysqli_real_escape_string($conn, $search);

// Build SQL query
$salesOrderDataTableQuery = "
SELECT 
    item.ID,
    item.CODE,
    item.DESCRIPTION,
    item_batches.BATCH_NO,
    item_batches.EXPIRY_DATE,
    unit_measure.NAME
FROM
    activeone_pazdistribution.item
        INNER JOIN
    item_batches ON item.ID = item_batches.ITEM_ID
        INNER JOIN
    (SELECT 
        unit_of_measure.ID ID, unit_of_measure.NAME NAME
    FROM
        activeone_pazdistribution.unit_of_measure
    WHERE
        unit_of_measure.INACTIVE = 0) unit_measure ON item.BASE_UNIT_ID = unit_measure.ID
WHERE
    item.INACTIVE = 0
        AND (item.CODE LIKE '%$escapedSearch%'
        OR item.DESCRIPTION LIKE '%$escapedSearch%')
ORDER BY item.DESCRIPTION
LIMIT 3
";

// Execute query
$result = mysqli_query($conn, $salesOrderDataTableQuery);

// Handle query failure
if (!$result) {
    $resultarr['error'] = 'Query failed: ' . mysqli_error($conn);
    echo json_encode($resultarr);
    exit;
}

// Process results only if there are rows
$rowCount = mysqli_num_rows($result);
if ($rowCount === 0) {
    mysqli_free_result($result);
    mysqli_close($conn);
    echo json_encode($resultarr);
    exit;
}

// Input field templates
$noOfQuantity = '<td> <input type="number" class="quantity-input" min="0" step="0.01">';
$noOfUM = '<td> <input type="number" class="um-input" min="0">';
$noOfUnitPrice = '<td> <input type="number" class="unit-price-input" min="0" step="0.01">';
$noOfAmount = '<td> <input type="number" class="amount-input">';
$noOfTax = '<td> <input type="number" class="tax-input" min="0" step="0.01">';
$noOfUnserve = '<td> <input type="number" class="unserve-input" min="0">';
$noOfReturnIndicator = '<td> <input type="number" class="return-indicator-input" min="0">';
$noOfExpiryDate = '<td> <input type="date" class="expiry-date-input">';
$noOfBatchNo = '<td> <input type="text" class="batch-no-input">';

// Fetch and format data
while($row = mysqli_fetch_array($result)) {
    $resultarr['data'][] = [
        $row['CODE'],
        $row['DESCRIPTION'],
        $row['BATCH_NO'],
        $row['EXPIRY_DATE'],
        $noOfQuantity,
        $row['NAME'],
        $noOfUnitPrice,
        $noOfAmount,
        $noOfTax,
        $noOfUnserve,
        $noOfReturnIndicator,
        $noOfExpiryDate,
        $noOfBatchNo,
        $row['ID']
    ];
}

// Clean up resources
mysqli_free_result($result);
mysqli_close($conn);

// Output JSON
// header('Content-Type: application/json');
echo json_encode($resultarr);
exit;

?>