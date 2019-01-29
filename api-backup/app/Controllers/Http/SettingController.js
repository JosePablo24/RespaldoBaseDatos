'use strict'

const Setting = use('App/Models/Setting')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with settings
 */
class SettingController {
  /**
   * Show a list of all settings.
   * GET settings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let settings = await Setting.all()
    return response.status(200).json(settings)
  }

  /**
   * Render a form to be used for creating a new setting.
   * GET settings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new setting.
   * POST settings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let settings = await Setting.create(request.all())
    return response.created(settings)
  }

  /**
   * Display a single setting.
   * GET settings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let {id} = params;
    let setting = await Setting.findOrFail(id)
    return response.ok(setting)
  }

  /**
   * Render a form to update an existing setting.
   * GET settings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update setting details.
   * PUT or PATCH settings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let {id} = params;
    let setting = await Setting.findOrFail(id)

    if(request._qs['type'] == 1 ){
      setting.merge(request.all())
    }

    setting.merge(request.all())
    await setting.save()
    return response.ok(setting)
  }

  /**
   * Delete a setting with id.
   * DELETE settings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let {id} = params;
    let setting = await Setting.findOrFail(id)

    await setting.delete()

    return response.ok({message : 'recurso eliminado'})
  }
}

module.exports = SettingController
