import { BusinessPartnerService } from './business-partner.service';
import { BusinessPartner, BusinessPartnerAddress } from '@sap/cloud-sdk-vdm-business-partner-service';
export declare class BusinessPartnerController {
    private readonly businessPartnerService;
    constructor(businessPartnerService: BusinessPartnerService);
    getAllBusinessPartners(): Promise<BusinessPartner[]>;
    getBusinessPartnerByID(businessPartnerId: any): Promise<BusinessPartner>;
    createBusinessPartnerAddress(requestBody: any, businessPartnerId: any): Promise<BusinessPartnerAddress>;
    updateBusinessPartnerAddress(requestBody: any, businessPartnerId: any, addressId: any): Promise<BusinessPartnerAddress>;
    deleteBusinessPartnerAddress(businessPartnerId: any, addressId: any): Promise<void>;
    updateAddressList(body: any): Promise<BusinessPartnerAddress[]>;
}
