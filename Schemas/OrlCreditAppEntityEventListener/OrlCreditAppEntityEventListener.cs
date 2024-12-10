 namespace BPMSoft.Configuration
{
	using System;
	using BPMSoft.Core;
	using BPMSoft.Core.DB;
    using BPMSoft.Core.Entities;
    using BPMSoft.Core.Entities.Events;

	[EntityEventListener(SchemaName = nameof(OrlCreditApp))]
	public class OrlCreditAppEntityEventListener : BaseEntityEventListener
	{
		public override void OnSaving(object sender, EntityBeforeEventArgs e)
		{
			base.OnSaving(sender, e);
			var entity = (OrlCreditApp)sender;
			var userConnection = entity.UserConnection;

            if (!(CheckRecords(entity.PrimaryColumnValue, userConnection, entity.OrlAppId) < GetMaxCountACreadit(userConnection)))
            {
				throw new Exception("Превышено максимальное количество заявок на кредит");
			}
        }

        private int CheckRecords(Guid creditAppId, UserConnection userConnection, Guid appId)
        {
            var select = new Select(userConnection)
                .Count(nameof(OrlCreditApp.Id))
				.From(nameof(OrlCreditApp))
				.Where(nameof(OrlCreditApp.OrlAppId)).IsEqual(Column.Parameter(appId))
				as Select;

			return select.ExecuteScalar<int>();
		}

		private int GetMaxCountACreadit(UserConnection userConnection)
        {
			return (int)Core.Configuration.SysSettings.GetValue(userConnection, "OrlMaximumNumberLoanApp");
		}
	}
}
