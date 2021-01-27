import { BusinessPartner, BusinessPartnerAddress } from '@sap/cloud-sdk-vdm-business-partner-service';
export declare class BusinessPartnerService {
    getAllBusinessPartners(): Promise<BusinessPartner[]>;
    getBusinessPartnerById(businessPartnerId: string): Promise<BusinessPartner>;
    createAddress(address: BusinessPartnerAddress): Promise<BusinessPartnerAddress>;
    buildAddress(requestBody: any, businessPartnerId: string): BusinessPartnerAddress;
    buildAddressWithAddressId(body: any, businessPartnerId: string, addressId: string): BusinessPartnerAddress;
    updateBusinessPartnerAddress(address: BusinessPartnerAddress): Promise<BusinessPartnerAddress>;
    deleteBusinessPartnerAddress(businessPartnerId: string, addressId: string): Promise<void>;
    updateAddreses(businessPartnerAddresses: BusinessPartnerAddress[]): Promise<BusinessPartnerAddress[]>;
    buildAddressList(body: any): BusinessPartnerAddress[];
}
