import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Args, ID } from '@nestjs/graphql';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>
  ) {

  }


  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemInput)
    return await this.itemsRepository.save(newItem)
  }

  async findAll(): Promise<Item[]> {
    //TODO: filtral,paginar,por usuario
    return this.itemsRepository.find()
  }

  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id })
    if (!item) throw new NotFoundError(`Item with id : ${id} not found`)

    return item

  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemsRepository.preload(updateItemInput)
    if (!item) throw new NotFoundError(`Item with id : ${id} not found`)
    return this.itemsRepository.save(item)
  }

  async remove(id: string): Promise<Item> {
    // TODO soft delete , integritad referencial
    const item = await this.findOne(id)
    await this.itemsRepository.remove(item)
    return { ...item, id }
  }
}
