class Api::VisitsController < ApplicationController
  before_action :require_login

    def create
    @visit = Visit.new(visit_params)
    @columns = Visit.column_names
    if @visit.save
      render 'api/visits/show'
    else
      render json: @visit.errors, status: 422
    end
  end

  def update
    @visit = Visit.find(params[:id])
    @columns = Visit.column_names
    if @visit.update(visit_params)
      render 'api/visits/show'
    else
      render json: @visit.errors, status: 422
    end
  end

  def index
    @visits = Patient.find(params[:patient_id]).visits
    @columns = Visit.column_names
    render 'api/visits/index'
  end

  def show
    @visit = Visit.find(params[:id])
    @columns = Visit.column_names
    render 'api/visits/show'
  end

  def destroy
    ids = params[:id].split(',');
    visits = Visit.where(:id => ids).destroy_all

    render json: {}
  end

  private

  def visit_params
    params.require(:visit).permit(
      :patient_id,
      :purpose_of_visit,
      :visit_details,
      :appointment_time,
    )
  end

end
