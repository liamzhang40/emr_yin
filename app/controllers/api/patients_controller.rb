class Api::PatientsController < ApplicationController
  before_action :require_login

  def create
    @patient = Patient.new(patient_params)
    @columns = Patient.column_names
    if @patient.save
      render 'api/patients/show'
    else
      render json: @patient.errors, status: 422
    end
  end

  def update
    @patient = Patient.find(params[:id])
    @columns = Patient.column_names
    if @patient.update(patient_params)
      render 'api/patients/show'
    else
      render json: @patient.errors, status: 422
    end
  end

  def index
    @patients = Patient.all
    @columns = Patient.column_names
    render 'api/patients/index'
  end

  def show
    @patient = Patient.find(params[:id])
    @columns = Patient.column_names
    render 'api/patients/show'
  end

  def destroy
    ids = params[:id].split(',');
    patients = Patient.where(:id => ids).destroy_all

    render json: {}
  end

  private

  def patient_params
    params.require(:patient).permit(
      :first_name,
      :last_name,
      :date_of_birth,
      :gender,
      :age,
      :email,
      :phone_number,
      :street_address,
      :city,
      :state,
      :zip,
      :description,
    )
  end
end
