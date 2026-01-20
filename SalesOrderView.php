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
            <div class="card">
              <div class="card-header">
                <h4>SALES ORDER</h4>
                <br>
                <button class="btn btn-success btn-flat btn-sm">Save and New</button>
              </div>
              <br>
              <div class="col-md-12 row">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-header">
                      <h5>Customer</h5>
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6>&nbspCustomer:&nbsp&nbsp</h6>
                      <!-- <input class="col-sm-8" type="text" id="customerInput" placeholder="Please Type Customer Here..." required> -->
                      <select class="col-sm-8" id="selectCustomer">
                        <option></option>
                      </select>
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6>&nbspP.O. Number:&nbsp&nbsp</h6>
                      <input class="col-sm-8" type="number">
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6>&nbspEncoded By:&nbsp&nbsp</h6>
                      <select class="col-sm-8"></select>
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6>&nbspTarget Arrival:&nbsp&nbsp</h6>
                      <input class="col-sm-8" type="date"></input>
                    </div>
                    <br>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="card">
                    <div class="card-header">
                      <h5>Transaction</h5>
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6>&nbspDate:&nbsp&nbsp</h6>
                      <input class="col-sm-5" type="date"></input>
                      <h6>&nbspReference No.:&nbsp&nbsp</h6>
                      <input class="col-sm-5" type="number">
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6>&nbspDelivery Date:&nbsp&nbsp</h6>
                      <input class="col-sm-2" type="date">
                      <h6>&nbspDelivery Type:&nbsp&nbsp</h6>
                      <select class="col-sm-3"></select>
                      <h6>&nbspSales Rep:&nbsp&nbsp</h6>
                      <select class="col-sm-3" id="selectSalesRep" required>
                        <option></option>
                      </select>
                    </div>
                    <br>
                    <div class="col-md-12 row">
                      <h6>&nbspLocation:&nbsp&nbsp</h6>
                      <select class="col-sm-2" id="selectLoc" required>
                        <option></option>
                      </select>
                      <div class="col-sm-3"></div>
                      <h6>&nbspShip Via:&nbsp&nbsp</h6>
                      <select class="col-sm-5" id="selectShipVia" required>
                        <option></option>
                      </select>
                    </div>
                    <br>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Products & Services</h5>
                  </div>
                  <br>
                  <input class="col-sm-3" type="text" id="searchInput" style="margin-left: 10px;" placeholder="ENTER ITEM CODE OR ITEM DESCRIPTION TO SEARCH...">
                  <div class="card-body" id="">
                    <table style="width: 100%;" class="display" id="resultsTable">
                      <thead style="font-size: 12px;" class="bg-navy">
                        <th class="bg-navy">#</th>
                        <th class="bg-navy">Code</th>
                        <th class="bg-navy">Description</th>
                        <th class="bg-navy">Batch #</th>
                        <th class="bg-navy">Exp. Date</th>
                        <th class="bg-navy">Qty.</th>
                        <th class="bg-navy">U/M</th>
                        <th class="bg-navy">Unit Price</th>
                        <th class="bg-navy">Amount</th>
                        <th class="bg-navy">Tax</th>
                        <th class="bg-navy">Unserve</th>
                        <th class="bg-navy">Return Indicator</th>
                        <th class="bg-navy">Expiry Date</th>
                        <th class="bg-navy">BatchNo</th>
                      </thead>
                      <tbody id="resultsBody" style="font-size: 11px; font-weight: bold;"></tbody>
                    </table>
                  </div>
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