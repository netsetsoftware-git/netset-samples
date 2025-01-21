import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { QueueService } from "src/bullmq/queue.service";
import { CreateVendorParam } from "src/params/create.vendor.param";
import { ResponseModel } from "src/params/response";
import { VendorService } from "src/service/vendor.service";

@Controller("/vendors") 
export class VendorController {
    
    constructor(
        private readonly vendorService: VendorService,
        private readonly queueService: QueueService
    ) {}

    @Post()
    async create(@Body() createVendor: CreateVendorParam) : Promise<ResponseModel> {   
        await this.vendorService.create(createVendor)
        return new ResponseModel("vendor created successfully")
    }

    @Get()
    async getAll(@Query() query:any) : Promise<ResponseModel> {
        const vendors = await this.vendorService.findAll(query)
        return new ResponseModel("vendors fetched successfully").setData("vendors", vendors)
    }

    @Get(":id")
    async getOne(@Param("id") id: string) : Promise<ResponseModel> {
        const vendor = await this.vendorService.find(id)
        return new ResponseModel("vendor fetched successfully").setData("vendor", vendor)
    }

    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() updateVendorDto: CreateVendorParam) : Promise<ResponseModel> {
        await this.vendorService.update(id, updateVendorDto)
        return new ResponseModel("vendor updated successfully")
    }

    @Delete(':id')
    async delete(@Param('id') id: string) : Promise<ResponseModel> {
        await this.vendorService.delete(id)
        return new ResponseModel("vendor deleted successfully")
    }

    @Delete()
    async deleteAll(@Body() ids: string[]) : Promise<ResponseModel> {
        await this.vendorService.deleteAll(ids)
        return new ResponseModel("vendors deleted successfully")
    }

    @Post("/notify")
    async notify(@Body() vendorIds: string[]) : Promise<ResponseModel> {   
        const vendors = await Promise.all(
            vendorIds.map(
                vendorId => this.vendorService.find(vendorId)
            )
        )
        await this.queueService.addJob(vendors);
        return new ResponseModel("notifications added to queue!")
    }
}