import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LinkDTO } from './link.dto';
import { AccessLinkDTO } from './accesslink.dto';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
    constructor(
        private linkService: LinkService
      ) {}
      
    @Post("/getlink")
     async getLink(@Body() accesLinkDTO: AccessLinkDTO) {
        const old_link = await this.linkService.getlink(accesLinkDTO)
        return {old_link};
    } 

    @Post('shortlink')
    async shortlink(@Body() linkDTO: LinkDTO) {
      const shortedlink = await this.linkService.create(linkDTO);
      return {shortedlink};
    }

    @Get('logs')
    async logs() {
      const logs = await this.linkService.getlog();
      return {logs};
    }

    @Get('mylinks/:email')
    async links(@Param() params) {
      const links = await this.linkService.getlinks(params.email);
      return {links};
    }

    @Delete('deletelink/:id')
    async deletelink(@Param() params) {
      const res = await this.linkService.deletelink(params.id);
      return {res};
    }
}
