define("OrlCreditApp1Page", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "OrlCreditApp",
		attributes: {
			"OrlApp": {
				dataValueType: BPMSoft.DataValueType.LOOKUP,
				lookupListConfig: {
					filter: function() { 
						var filterGroup = BPMSoft.createFilterGroup();
						filterGroup.add("TypeFilterManager",
							BPMSoft.createColumnFilterWithParameter(
								BPMSoft.ComparisonType.EQUAL,
								"Type",
								"00783ef6-f36b-1410-a883-16d83cab0980"
								));
						filterGroup.add("BirthDateFilter",
							BPMSoft.createColumnFilterWithParameter(
								BPMSoft.ComparisonType.LESS_OR_EQUAL,
								"BirthDate",
								BPMSoft.clearTime(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
								));
						return filterGroup;
					}
				}
			},
			"OnOrlCatProdChange": {
				"dependencies": [
					{
						columns: ["OrlCatProd"],
						methodName: "onOrlCatProdChanged"
					}
				]
			},
			"PreliminaryDecision": {
				"dataValueType": BPMSoft.DataValueType.TEXT,
				"type": BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
			},
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "OrlCreditAppFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "OrlCreditApp"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			onOrlCatProdChanged: function () {
				if (this.getLookupValue("OrlCatProd") === "bd8a0599-f761-43b3-a4b0-8986f8b844b5") { // Ипотека
					this.set("OrlDeadlineApp", new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000));
				}
				else if (this.getLookupValue("OrlCatProd") === "67fa7453-2c66-4e4d-b24d-b7c4f9922388") { //Потребительский кредит
					this.set("OrlDeadlineApp", new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000));
				}
				else {
					this.set("OrlDeadlineApp", undefined);
				}
			},
			getActions: function () {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(
					this.getButtonMenuItem({
						Type: "BPMSoft.MenuSeparator",
						Caption: BPMSoft.emptyString
					})
				);
				actionMenuItems.addItem(
					this.getButtonMenuItem({
						"Caption": "Получить предварительное решение",
						"Tag": "runServiceClick",
						"Visible": true,
						"Enabled": {"bindTo": "canEntityBeOperated"}
					})
				);
				return actionMenuItems;
			},
			runServiceClick: function () {
				const orlAppId = this.getLookupValue("OrlApp");
				
				if (!orlAppId) {
					this.showInformationDialog("Заполните поле «Заявитель», чтобы вызвать веб-сервис");
					return;
				}
				
				var serviceName = "OrlCreditAppService";
					var methodName = "GetResult";
					var data = {
						orlApp: orlAppId
					};
				ServiceHelper.callService(serviceName, methodName, this.getServiceResult, data, this);
			},
			getServiceResult: function(response, success) {
				if (success) {
					//this.showInformationDialog(response.GetResultResult);
					this.set("PreliminaryDecision", response.GetResultResult);
				}
			},
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "OrlName6f3abf07-d606-4dae-94a0-85c9697ce55b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "OrlName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OrlNumbera5645663-c3e1-4230-a024-8b391fd18207",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "OrlNumber"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OrlApp88d98ef7-0993-4676-88bf-70b883f43168",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "OrlApp"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OrlCatProdf278454c-99fd-419a-8a42-01b155da46a7",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 13,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "OrlCatProd"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OrlOwner9abcd5cb-7673-4258-80b1-21d75e846902",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "OrlOwner"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "OrlAmountCredit2be2daa9-3db1-4acf-a68c-0d8c72db4682",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "OrlAmountCredit"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "OrlDeadlineAppf4e80011-5c96-4fb5-9643-b89344c4d059",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 13,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "OrlDeadlineApp"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "OrlStatus50973c37-9858-4a3e-96e6-37f87ceb5ac1",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 13,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "OrlStatus"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			
			{
				"operation": "insert",
				"name": "PreliminaryDecision",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 8,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "PreliminaryDecision",
					"enabled": false,
					"caption": "Предварительное решение",
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "OrlNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 1
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
