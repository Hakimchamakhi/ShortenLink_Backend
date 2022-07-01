import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Link} from 'src/types/link'
import { LinkDTO } from './link.dto';
import { v4 as uuidv4 } from 'uuid';
import { Log } from 'src/types/log';

@Injectable()
export class LinkService {

    constructor(
        @InjectModel('Link') private linkModel: Model<Link>,
        @InjectModel('Log') private logModel: Model<Log>,
      ) {}
    
      async create(LinkDTO: LinkDTO) {
        const { old_link } = LinkDTO;
        const link = await this.linkModel.find({ user_email:LinkDTO.user_email });
        if (link.length>=5) {
          return {success:false, message :('You Have reached your max link Shortned (5 Links)')};
        }
        const links = await this.linkModel.find({});
        if (links.length>=20){
            await this.linkModel.findByIdAndDelete(links[0]._id)
        }
        
        let shorted_link = uuidv4().substring(0,6)
         const new_link = {old_link, user_email:LinkDTO.user_email, shorted_link }
        const createdLink = new this.linkModel(new_link);
        
        const savedlink = await createdLink.save();
        return {success:true, message :('Link Shortned!'), shorted_link:savedlink};
       
      }
      async getlink(body){
        const link = await this.linkModel.findOne({ shorted_link: body.id });
        const savelog = {user_email: body.user_email, ip:body.ip.ip, pays:body.pays,link:"http://localhost:4200/"+link.shorted_link, agent:body.agent}
        const log = new this.logModel(savelog)
        await log.save()
        return link.old_link;
      }

      async getlog(){
        const log = await this.logModel.find({  });
        return log;
      }

      async getlinks(email){
        const links = await this.linkModel.find({ user_email:email });
        return links;
      }

      async deletelink(id){
        return await this.linkModel.findByIdAndDelete(id);;
      }

     
      
      
      
      
      
    
}