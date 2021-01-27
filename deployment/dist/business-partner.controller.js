"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartnerController = void 0;
const common_1 = require("@nestjs/common");
const business_partner_service_1 = require("./business-partner.service");
let BusinessPartnerController = class BusinessPartnerController {
    constructor(businessPartnerService) {
        this.businessPartnerService = businessPartnerService;
    }
    getAllBusinessPartners() {
        return this.businessPartnerService.getAllBusinessPartners();
    }
    getBusinessPartnerByID(businessPartnerId) {
        return this.businessPartnerService.getBusinessPartnerById(businessPartnerId);
    }
    createBusinessPartnerAddress(requestBody, businessPartnerId) {
        const address = this.businessPartnerService.buildAddress(requestBody, businessPartnerId);
        return this.businessPartnerService.createAddress(address);
    }
    updateBusinessPartnerAddress(requestBody, businessPartnerId, addressId) {
        const address = this.businessPartnerService.buildAddressWithAddressId(requestBody, businessPartnerId, addressId);
        return this.businessPartnerService.updateBusinessPartnerAddress(address);
    }
    deleteBusinessPartnerAddress(businessPartnerId, addressId) {
        return this.businessPartnerService.deleteBusinessPartnerAddress(businessPartnerId, addressId);
    }
    updateAddressList(body) {
        const addresses = this.businessPartnerService.buildAddressList(body);
        return this.businessPartnerService.updateAddreses(addresses);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusinessPartnerController.prototype, "getAllBusinessPartners", null);
__decorate([
    common_1.Get('/:businessPartnerId'),
    __param(0, common_1.Param('businessPartnerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BusinessPartnerController.prototype, "getBusinessPartnerByID", null);
__decorate([
    common_1.Post('/:businessPartnerId/address'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()), __param(1, common_1.Param('businessPartnerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BusinessPartnerController.prototype, "createBusinessPartnerAddress", null);
__decorate([
    common_1.Put('/:businessPartnerId/address/:addressId'),
    __param(0, common_1.Body()), __param(1, common_1.Param('businessPartnerId')), __param(2, common_1.Param('addressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BusinessPartnerController.prototype, "updateBusinessPartnerAddress", null);
__decorate([
    common_1.Delete('/:businessPartnerId/address/:addressId'),
    common_1.HttpCode(204),
    __param(0, common_1.Param('businessPartnerId')), __param(1, common_1.Param('addressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BusinessPartnerController.prototype, "deleteBusinessPartnerAddress", null);
__decorate([
    common_1.Post('/update-address-list'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BusinessPartnerController.prototype, "updateAddressList", null);
BusinessPartnerController = __decorate([
    common_1.Controller('business-partners'),
    __metadata("design:paramtypes", [business_partner_service_1.BusinessPartnerService])
], BusinessPartnerController);
exports.BusinessPartnerController = BusinessPartnerController;
//# sourceMappingURL=business-partner.controller.js.map