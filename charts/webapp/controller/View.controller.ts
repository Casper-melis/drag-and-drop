import BusyDialog from "sap/m/BusyDialog";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import FeedItem from "sap/viz/ui5/controls/common/feeds/FeedItem";
import DimensionDefinition from "sap/viz/ui5/data/DimensionDefinition";
import FlattenedDataset from "sap/viz/ui5/data/FlattenedDataset";
import MeasureDefinition from "sap/viz/ui5/data/MeasureDefinition";
import VizFrame from "sap/viz/ui5/controls/VizFrame";
/**
 * @namespace sap.btp.charts.controller
 */
export default class View extends Controller {

    public onInit(): void {
        this.getWarehouseTaskData();
    }

    getWarehouseTaskData(){
        const oModel = this.getOwnerComponent()?.getModel() as ODataModel;
        const oJSONModel = new JSONModel();
        const oBusyDialog = new BusyDialog({
            title: "Loading Data",
            text: "Please Wait",
        });
        oBusyDialog.open();
        oModel.read("/WarehouseTask", { 
            success: (oData: any) => {
                oBusyDialog.close();
               
                oJSONModel.setData(oData.results);
                this.getView()?.setModel(oJSONModel, "warehouseTaskData");
                this.chart()
               console.log(oData.results)
            },
            error: (oError: any) => {
                oBusyDialog.close();
                console.error("Data read error: ", oError);
            }
        });
    }

    chart() {
        const oVizFrame = this.getView()?.byId("chartContainer") as VizFrame;
        if (!oVizFrame) {
            console.error("VizFrame not found");
            return;
        }
    
        const oModel = this.getOwnerComponent()?.getModel("warehouseTaskData");
        oVizFrame.setModel(oModel);
    
        const oDataSet = new FlattenedDataset({
            dimensions: [
                new DimensionDefinition({
                    name: "Product",
                    value: "{ProductName}"
                })
            ],
            measures: [
                new MeasureDefinition({
                    name: "Quantity",
                    value: "{ActualQuantityInAltvUnit}" 
                }),
                new MeasureDefinition({
                    name : "TargetQuantity",
                    value : "{TargetQuantityInAltvUnit}"
                })
            ],
            data: {
                path: "/WarehouseTask" 
            }
            
        });
    
        oVizFrame.setDataset(oDataSet);
        oVizFrame.setVizType('vertical_bullet');
    
        const oDimensionFeed = new FeedItem({
            uid: "categoryAxis",
            type: "Dimension",
            values: ["Product"]
        });
    
        const oValueFeed = new FeedItem({
            uid: "valueAxis",
            type: "Measure",
            values: ["Quantity"]
        });

        const oTagetValue = new FeedItem({
            uid: "targetValues",
            type: "Measure",
            values:["TargetQuantity"]
        })
    
        oVizFrame.addFeed(oDimensionFeed);
        oVizFrame.addFeed(oValueFeed);
        oVizFrame.addFeed(oTagetValue)
    }
    
    
    
}
