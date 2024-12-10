 namespace BPMSoft.Configuration
{
	using System;
	using System.ServiceModel;
	using System.ServiceModel.Web;
	using System.ServiceModel.Activation;
	using BPMSoft.Core;
	using BPMSoft.Web.Common;
	using BPMSoft.Core.Factories;
	using System.Collections.Generic;
    using BPMSoft.Core.Entities;

    [ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class OrlCreditAppService : BaseService
	{
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
			ResponseFormat = WebMessageFormat.Json)]
		public string GetResult(string orlApp)
		{
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "OrlCreditHist");
			esq.AddAllSchemaColumns();
			esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "OrlContact", new Guid(orlApp)));
			esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "OrlIsEnd", true));
			var entities = esq.GetEntityCollection(UserConnection);

			if (entities.Count >= 2)
			{
				return "Одобрено";
			}

			return "Отклонено";
		}
	}
}
