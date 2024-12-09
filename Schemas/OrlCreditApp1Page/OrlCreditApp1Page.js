define("OrlCreditApp1Page", [], function() {
	return {
		entitySchemaName: "OrlCreditApp",
		attributes: {},
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
		methods: {},
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
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0,
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"name": "Files",
				"values": {
					"itemType": BPMSoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"name": "NotesControlGroup",
				"values": {
					"itemType": BPMSoft.ViewItemType.CONTROL_GROUP,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"name": "Notes",
				"values": {
					"bindTo": "OrlNotes",
					"dataValueType": BPMSoft.DataValueType.TEXT,
					"contentType": BPMSoft.ContentType.RICH_TEXT,
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
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
