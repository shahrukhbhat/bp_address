import { Injectable } from '@nestjs/common';
import { batch, BusinessPartner, BusinessPartnerAddress, changeset } from '@sap/cloud-sdk-vdm-business-partner-service';
import { WriteResponses, ReadResponse, BatchResponse } from '@sap-cloud-sdk/core';

@Injectable()
export class BusinessPartnerService {
    //public dummyText = 'Not yet implemented.';

    getAllBusinessPartners(): Promise<BusinessPartner[]> {
        return BusinessPartner.requestBuilder()
            .getAll()
            .select(
                BusinessPartner.BUSINESS_PARTNER,
                BusinessPartner.FIRST_NAME,
                BusinessPartner.LAST_NAME
            )
            .filter(
                BusinessPartner.BUSINESS_PARTNER_CATEGORY.equals('1')
            )
            .execute({ destinationName: 's4mockserver' });
    }

    getBusinessPartnerById(businessPartnerId: string): Promise<BusinessPartner> {
        return BusinessPartner.requestBuilder()
            .getByKey(businessPartnerId)
            .select(
                BusinessPartner.BUSINESS_PARTNER,
                BusinessPartner.LAST_NAME,
                BusinessPartner.FIRST_NAME,
                BusinessPartner.IS_MALE,
                BusinessPartner.IS_FEMALE,
                BusinessPartner.CREATION_DATE,
                BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS.select(
                    BusinessPartnerAddress.BUSINESS_PARTNER,
                    BusinessPartnerAddress.ADDRESS_ID,
                    BusinessPartnerAddress.COUNTRY,
                    BusinessPartnerAddress.POSTAL_CODE,
                    BusinessPartnerAddress.CITY_NAME,
                    BusinessPartnerAddress.STREET_NAME,
                    BusinessPartnerAddress.HOUSE_NUMBER
                )
            )
            .execute({ destinationName: 's4mockserver' });
    }

    createAddress(address: BusinessPartnerAddress): Promise<BusinessPartnerAddress> {
        return BusinessPartnerAddress.requestBuilder()
            .create(address)
            .execute({ destinationName: 's4mockserver' });
    }

    buildAddress(requestBody: any, businessPartnerId: string): BusinessPartnerAddress {
        const address = BusinessPartnerAddress.builder().fromJson(requestBody);
        address.businessPartner = businessPartnerId;
        return address;
    }

    buildAddressWithAddressId(body: any, businessPartnerId: string, addressId: string): BusinessPartnerAddress {
        const address = BusinessPartnerAddress.builder().fromJson(body);
        address.businessPartner = businessPartnerId;
        address.addressId = addressId;
        return address;
    }

    updateBusinessPartnerAddress(address: BusinessPartnerAddress): Promise<BusinessPartnerAddress> {
        return BusinessPartnerAddress.requestBuilder()
            .update(address)
            .execute({ destinationName: 's4mockserver' });
    }

    deleteBusinessPartnerAddress(businessPartnerId: string, addressId: string): Promise<void> {
        return BusinessPartnerAddress.requestBuilder()
        .delete(businessPartnerId, addressId)
        .execute({ destinationName: 's4mockserver' });
      }

      async updateAddreses(businessPartnerAddresses: BusinessPartnerAddress[]): Promise<BusinessPartnerAddress[]> {
        const updateRequests = businessPartnerAddresses.map(address => BusinessPartnerAddress.requestBuilder().update(address));
        const retrieveRequests = businessPartnerAddresses.map(address =>
            BusinessPartnerAddress.requestBuilder().getByKey(address.businessPartner, address.addressId)
          );
        const [updateChangesetResponse, ...retrieveResponses] = await batch(changeset(...updateRequests), ...retrieveRequests)
        .execute({ destinationName: 's4mockserver' });
        //   return (updateChangesetResponse as WriteResponses).responses.map(response => response.as!(BusinessPartnerAddress));
        return retrieveResponses.reduce((addresses, response: ReadResponse) => [...addresses, response.as(BusinessPartnerAddress)],[]);
        
        }

      buildAddressList(body: any): BusinessPartnerAddress[] {
        return body.map(address => BusinessPartnerAddress.builder().fromJson(address));
      } 
}