
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Vendor } from 'src/models';
import { CreateVendorParam } from 'src/params/create.vendor.param';

@Injectable()
export class VendorService {
  constructor(
    @Inject('VENDOR_MODEL')
    private vendorModel: Model<Vendor>,
  ) {}

  async create(createVendorParam: CreateVendorParam): Promise<Vendor> {
    const createdVendor = new this.vendorModel(createVendorParam);
    return createdVendor.save();
  }

  async find(id:string): Promise<Vendor> {
    return this.vendorModel.findOne({_id : id});
  }

  async update(id:string, updateVendorParam: CreateVendorParam): Promise<Vendor> {
    return this.vendorModel.findOneAndUpdate({_id : id}, updateVendorParam);
  }

  async findAll(query:any): Promise<Vendor[]> {
    return this.vendorModel.find(query).exec();
  }

  async delete(id:string): Promise<Vendor> {
    return this.vendorModel.findOneAndDelete({_id : id});
  }

  async deleteAll(ids:string[]) {
    return this.vendorModel.deleteMany({_id :  { $in : ids } });
  }
}
