"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartnerService = void 0;
const common_1 = require("@nestjs/common");
const cloud_sdk_vdm_business_partner_service_1 = require("@sap/cloud-sdk-vdm-business-partner-service");
let BusinessPartnerService = class BusinessPartnerService {
    getAllBusinessPartners() {
        return cloud_sdk_vdm_business_partner_service_1.BusinessPartner.requestBuilder()
            .getAll()
            .select(cloud_sdk_vdm_business_partner_service_1.BusinessPartner.BUSINESS_PARTNER, cloud_sdk_vdm_business_partner_service_1.BusinessPartner.FIRST_NAME, cloud_sdk_vdm_business_partner_service_1.BusinessPartner.LAST_NAME)
            .filter(cloud_sdk_vdm_business_partner_service_1.BusinessPartner.BUSINESS_PARTNER_CATEGORY.equals('1'))
            .execute({ destinationName: 's4mockserver' });
    }
    getBusinessPartnerById(businessPartnerId) {
        return cloud_sdk_vdm_business_partner_service_1.BusinessPartner.requestBuilder()
            .getByKey(businessPartnerId)
            .select(cloud_sdk_vdm_business_partner_service_1.BusinessPartner.BUSINESS_PARTNER, cloud_sdk_vdm_business_partner_service_1.BusinessPartner.LAST_NAME, cloud_sdk_vdm_business_partner_service_1.BusinessPartner.FIRST_NAME, cloud_sdk_vdm_business_partner_service_1.BusinessPartner.IS_MALE, cloud_sdk_vdm_business_partner_service_1.BusinessPartner.IS_FEMALE, cloud_sdk_vdm_business_partner_service_1.BusinessPartner.CREATION_DATE, cloud_sdk_vdm_business_partner_service_1.BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS.select(cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.BUSINESS_PARTNER, cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.ADDRESS_ID, cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.COUNTRY, cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.POSTAL_CODE, cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.CITY_NAME, cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.STREET_NAME, cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.HOUSE_NUMBER))
            .execute({ destinationName: 's4mockserver' });
    }
    createAddress(address) {
        return cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.requestBuilder()
            .create(address)
            .execute({ destinationName: 's4mockserver' });
    }
    buildAddress(requestBody, businessPartnerId) {
        const address = cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.builder().fromJson(requestBody);
        address.businessPartner = businessPartnerId;
        return address;
    }
    buildAddressWithAddressId(body, businessPartnerId, addressId) {
        const address = cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.builder().fromJson(body);
        address.businessPartner = businessPartnerId;
        address.addressId = addressId;
        return address;
    }
    updateBusinessPartnerAddress(address) {
        return cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.requestBuilder()
            .update(address)
            .execute({ destinationName: 's4mockserver' });
    }
    deleteBusinessPartnerAddress(businessPartnerId, addressId) {
        return cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.requestBuilder()
            .delete(businessPartnerId, addressId)
            .execute({ destinationName: 's4mockserver' });
    }
    async updateAddreses(businessPartnerAddresses) {
        const updateRequests = businessPartnerAddresses.map(address => cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.requestBuilder().update(address));
        const retrieveRequests = businessPartnerAddresses.map(address => cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.requestBuilder().getByKey(address.businessPartner, address.addressId));
        const [updateChangesetResponse, ...retrieveResponses] = await cloud_sdk_vdm_business_partner_service_1.batch(cloud_sdk_vdm_business_partner_service_1.changeset(...updateRequests), ...retrieveRequests)
            .execute({ destinationName: 's4mockserver' });
        return updateChangesetResponse.responses.map(response => response.as(cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress));
    }
    buildAddressList(body) {
        return body.map(address => cloud_sdk_vdm_business_partner_service_1.BusinessPartnerAddress.builder().fromJson(address));
    }
};
BusinessPartnerService = __decorate([
    common_1.Injectable()
], BusinessPartnerService);
exports.BusinessPartnerService = BusinessPartnerService;
//# sourceMappingURL=business-partner.service.js.map