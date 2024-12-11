import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import { AlertMessageType } from "../enums/alert-message-type";

@Injectable()
export class AlertHelperService {

    constructor(
        private toastrService: ToastrService,
    ) {
    }

    showAlertMessage(
        message: string,
        alertMessageType: AlertMessageType = AlertMessageType.Success,
        title: string = '',
        timeOut: number = 2000,
        positionClass: string = 'toast-top-right') {

        if (!message)
            throw new Error('AlertHelper : Parameter "message" is required');
debugger
        switch (alertMessageType) {
            case AlertMessageType.Success:
                this.toastrService.success(message, title, {timeOut: timeOut, positionClass: positionClass});
                break;
            case AlertMessageType.Error:
                this.toastrService.error(message, title, {timeOut: timeOut, positionClass: positionClass});
                break;
            case AlertMessageType.Warning:
                this.toastrService.warning(message, title, {timeOut: timeOut, positionClass: positionClass});
                break;
            case AlertMessageType.Information:
                this.toastrService.info(message, title, {timeOut: timeOut, positionClass: positionClass});
                break;
        }

    }


}


