import Controller from "sap/ui/core/mvc/Controller";
import DateFormat from "sap/ui/core/format/DateFormat";

export default  {
    formatDate: function (this: Controller, date: Date): string | undefined {

        if(!date){
            return ''
        }
        const dateFormatter = DateFormat.getDateInstance({
            style: "long" // Can be 'short', 'medium', 'long', or 'full'
        });

        return dateFormatter.format(date);
        
        
    }
};