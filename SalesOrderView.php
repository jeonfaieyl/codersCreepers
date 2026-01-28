<!DOCTYPE html>
<html lang="en">
<?php include '../Main/header.php' ?>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sales Order</title>
</head>
<body class="layout-top-nav">
  <div class="content-wrapper">
    <div class="content">
      <div class="container-fluid" style="color: black;">
        <div class="row">
          <div class="col-lg-12">
            <form id="submitAllDataForm">
              <div class="card">
              <div class="card-header">
                <h4>SALES ORDER</h4>
                <!-- <br> -->
                <button class="btn btn-success btn-flat btn-sm" type="submit" id="submitAllDataButton">Save and New</button>
              </div>
              <!-- <br> -->
              <div class="col-md-12 row">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-header" style="padding: 5px;">
                      <h5>Customer</h5>
                    </div>
                    <!-- <br> -->
                    <div class="col-md-12 row">
                      <h6 style="font-size: 13px">&nbspCustomer:</h6>
                      <!-- <input class="col-sm-8" type="text" id="customerInput" placeholder="Please Type Customer Here..." required> -->
                      <h6 id="priceLevelId"></h6>
                      <select class="col-sm-8" id="selectCustomer" required>
                        <option></option>
                      </select>
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6 style="font-size: 13px">&nbspP.O. Number:&nbsp&nbsp</h6>
                      <input class="col-sm-8" type="number" required>
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6 style="font-size: 13px">&nbspEncoded By:&nbsp&nbsp</h6>
                      <select class="col-sm-8" id="selectTelesellers" required>
                        <option></option>
                      </select>
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6 style="font-size: 13px">&nbspTarget Arrival:&nbsp&nbsp</h6>
                      <input id="targetArrivalDate" class="col-sm-8" type="date" required>
                    </div>
                    <br>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="card">
                    <div class="card-header" style="padding: 5px;">
                      <h5>Transaction</h5>
                    </div>
                    <!-- <br> -->
                    <div class="col-md-12 row">
                      <h6 style="font-size: 13px">&nbspDate:&nbsp&nbsp</h6>
                      <input id="transactionDate" class="col-sm-5" type="date" required></input>
                      <h6 style="font-size: 13px">&nbspReference No.:&nbsp&nbsp</h6>
                      <input class="col-sm-5" type="number">
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6 style="font-size: 13px">&nbspDelivery Date:&nbsp&nbsp</h6>
                      <input id="deliveryDate" class="col-sm-2" type="date" required>
                      <h6 style="font-size: 13px">&nbspDelivery Type:&nbsp&nbsp</h6>
                      <select class="col-sm-3" id="selectDeliveryType" required>
                        <option></option>
                      </select>
                      <h6 style="font-size: 13px">&nbspSales Rep:&nbsp&nbsp</h6>
                      <select class="col-sm-3" id="selectSalesRep" required>
                        <option></option>
                      </select>
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6 style="font-size: 13px">&nbspLocation:&nbsp&nbsp</h6>
                      <select class="col-sm-2" id="selectLoc" required>
                        <option></option>
                      </select>
                      <div class="col-sm-3"></div>
                      <h6 style="font-size: 13px">&nbspShip Via:&nbsp&nbsp</h6>
                      <select class="col-sm-5" id="selectShipVia">
                        <option></option>
                      </select>
                    </div>
                    <br>
                  </div>
                </div>
              </div>
            </form>
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header" style="padding: 5px;">
                    <h5>Products & Services</h5>
                  </div>
                  <!-- <br> -->
                  <input class="col-sm-3" type="text" id="searchInput" style="margin-left: 10px; font-size: 17px" placeholder="ENTER ITEM CODE OR ITEM DESCRIPTION">
                  <div class="card-body" id="">
                    <table style="width: 100%;" class="display" id="resultsTable">
                      <thead style="font-size: 12px;" class="bg-navy">
                        <th class="bg-navy">#</th>
                        <th class="bg-navy">Code</th>
                        <th class="bg-navy">Description</th>
                        
                        <!-- <th class="bg-navy">Qty.</th> -->
                        <th class="bg-navy">U/M</th>
                        <th class="bg-navy" hidden>Unit Price</th>
              
                       
                      </thead>
                      <tbody id="resultsBody" style="font-size: 11px; font-weight: bold;"></tbody>
                    </table>
                  </div>

                  <!-- <div id="selectionPanel" class="selection-panel"> -->
                    <div class="panel-header">
                      <h6>&nbspSelected Items (<span id="selectedCount">0</span>)</h6>
                      <!-- <button id="clearAll">Clear All</button> -->
                    </div>
                    <div class="col-sm-12" style="width: 100%">
                      <table style="width: 100%;" class="display" id="selectedResultsTable">
                        <thead style="font-size: 12px;" class="bg-navy" style="width: 100%;">
                          <th class="bg-navy">Code</th>
                          <th class="bg-navy">Description</th>
       
                          <th class="bg-navy">Qty.</th>
                          <th class="bg-navy">U/M</th>
                          <th class="bg-navy">Unit Price</th>
                          <th class="bg-navy">Unit Price2</th>
                          <th class="bg-navy">Amount</th>
               
                        </thead>
                        <tbody id="selectedResultsBody" style="font-size: 11px; font-weight: bold;"></tbody>
                      </table>
                    </div>
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

<?php include '../Main/RequiredScripts.php' ?>

<script src="../../Scripts/sales_order_view.js"></script>
<script type="text/javascript">

   function get_related_price(id){
    var um = $('#select2'+id).val();
     console.log(um);

     $()
}

</script>
