import DemoService from './Service';
import { ApiGetway, resolveEntityParams } from '../../';
import * as Router from 'koa-router';
import DemoMeta from './Meta';

export default class DemoApi {
    private demoService: DemoService;

    constructor() {
        this.demoService = new DemoService();
    }

    @ApiGetway('POST', {})
    public async create(ctx: Router.IRouterContext) {
        const info = resolveEntityParams(ctx, DemoMeta);
        const result = await this.demoService.create(info);
        ctx.body = { result };
    }

    @ApiGetway('GET', {})
    public async count(ctx: Router.IRouterContext) {
        const result = await this.demoService.countQCTask();
        ctx.body = result;
    }
}
