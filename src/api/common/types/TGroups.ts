import { CurrentUserGroup } from '@api/models/currentUser/queryGroup'
import { ProjectGroup } from '@api/models/project/queryGroup'
import { DirectionGroup } from '@api/models/direction/queryGroup'
import { ProjectEndpointGroup } from '@api/models/projectEndpoint/queryGroup'
import { DirectionBillingPeriodGroup } from '@api/models/directionBillingPeriod/queryGroup'
import { CurrencyGroup } from '@api/models/currency/queryGroup'
import { OrganizationalLegalFormGroup } from '@api/models/organizationalLegalForm/queryGroup'
import { WorkerProfileGroup } from '@api/models/workerProfile/queryGroup'
import { WorkTimeRangeGroup } from '@api/models/workTimeRange/queryGroup'
import { ProjectStatusGroup } from '@api/models/projectStatus/queryGroup'
import { DirectionStatusGroup } from '@api/models/directionStatus/queryGroup'
import { DirectionFamilyGroup } from '@api/models/directionFamily/queryGroup'
import { DirectionTypeGroup } from '@api/models/directionType/queryGroup'
import { PaymentModelGroup } from '@api/models/paymentModel/queryGroup'
import { PaymentPeriodGroup } from '@api/models/paymentPeriod/queryGroup'
import { BillingDocumentStatusGroup } from '@api/models/billingDocumentStatus/queryGroup'
import { RecurrenceTypeGroup } from '@api/models/recurrenceType/queryGroup'
import { EndpointEnvironmentGroup } from '@api/models/endpointEnvironment/queryGroup'
import { TaskGroup } from '@api/models/task/queryGroup'
import { TaskStatusGroup } from '@api/models/taskStatus/queryGroup'
import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'
import { CustomerProfileGroup } from '@api/models/customerProfile/queryGroup'
import { CallGroup } from '@api/models/call/queryGroup'
import { PhoneNumberGroup } from '@api/models/phoneNumber/queryGroup'
import { CallExtensionGroup } from '@api/models/callExtension/queryGroup'
import { CompanyDialNumberGroup } from '@api/models/companyDialNumber/queryGroup'
import { OperatorProfileGroup } from '@api/models/operatorProfile/queryGroup'
import { BlockedPhoneNumberGroup } from '@api/models/blockedPhoneNumber/queryGroup'
import { TelephonyAccountGroup } from '@api/models/telephonyAccount/queryGroup'
import { TelephonySoftphoneGroup } from '@api/models/telephonySoftphone/queryGroup'
import { TelephonyQueuesGroup } from '@api/models/telephonyQueues/queryGroup'

export type GroupClass =
  | typeof CurrentUserGroup
  | typeof ProjectGroup
  | typeof DirectionGroup
  | typeof ProjectEndpointGroup
  | typeof DirectionBillingPeriodGroup
  | typeof CurrencyGroup
  | typeof OrganizationalLegalFormGroup
  | typeof WorkerProfileGroup
  | typeof WorkTimeRangeGroup
  | typeof ProjectStatusGroup
  | typeof DirectionStatusGroup
  | typeof DirectionFamilyGroup
  | typeof DirectionTypeGroup
  | typeof PaymentModelGroup
  | typeof PaymentPeriodGroup
  | typeof BillingDocumentStatusGroup
  | typeof RecurrenceTypeGroup
  | typeof EndpointEnvironmentGroup
  | typeof TaskGroup
  | typeof TaskStatusGroup
  | typeof CustomerCompanyGroup
  | typeof CustomerProfileGroup
  | typeof CallGroup
  | typeof PhoneNumberGroup
  | typeof CallExtensionGroup
  | typeof CompanyDialNumberGroup
  | typeof OperatorProfileGroup
  | typeof BlockedPhoneNumberGroup
  | typeof TelephonyAccountGroup
  | typeof TelephonySoftphoneGroup
  | typeof TelephonyQueuesGroup
export type GroupMethod =
  | typeof CurrentUserGroup
  | typeof ProjectGroup
  | typeof DirectionGroup
  | typeof ProjectEndpointGroup
  | typeof DirectionBillingPeriodGroup
  | typeof CurrencyGroup
  | typeof OrganizationalLegalFormGroup
  | typeof WorkerProfileGroup
  | typeof WorkTimeRangeGroup
  | typeof ProjectStatusGroup
  | typeof DirectionStatusGroup
  | typeof DirectionFamilyGroup
  | typeof DirectionTypeGroup
  | typeof PaymentModelGroup
  | typeof PaymentPeriodGroup
  | typeof BillingDocumentStatusGroup
  | typeof RecurrenceTypeGroup
  | typeof EndpointEnvironmentGroup
  | typeof TaskGroup
  | typeof TaskStatusGroup
  | typeof CustomerCompanyGroup
  | typeof CustomerProfileGroup
  | typeof CallGroup
  | typeof PhoneNumberGroup
  | typeof CallExtensionGroup
  | typeof CompanyDialNumberGroup
  | typeof OperatorProfileGroup
  | typeof BlockedPhoneNumberGroup
  | typeof TelephonyAccountGroup
  | typeof TelephonySoftphoneGroup
  | typeof TelephonyQueuesGroup
