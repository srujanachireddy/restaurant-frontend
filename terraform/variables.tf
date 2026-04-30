variable "resource_group_name" {
  description = "Name of the Azure resource group"
  type        = string
  default     = "tf-devops-rg"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "eastus"
}

variable "acr_name" {
  description = "Name of the Azure Container Registry"
  type        = string
  default     = "srujanatfacr001"
}