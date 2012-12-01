/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(document).bind("mobileinit",function()
		{
			$.support.cors=true;
			$.mobile.buttonMarkup.hoverDelay=0;
			$.mobile.allowCrossDomainPages=true;
			$.mobile.phonegapNavigationEnabled=true;
			$.mobile.defaultDialogTransition="none";
			$.mobile.defaultPageTransition="none";
			$.mobile.transitionFallbacks.fade="none";
			$.mobile.transitionFallbacks.pop="none";
			$.mobile.transitionFallbacks.flip="none";
			$.mobile.transitionFallbacks.turn="none";
			$.mobile.transitionFallbacks.flow="none";
			$.mobile.transitionFallbacks.slidefade="none";
			$.mobile.transitionFallbacks.slide="none";
			$.mobile.transitionFallbacks.slideup="none";
			$.mobile.transitionFallbacks.slidedown="none";
		});

$(document).bind("deviceready",function()
		{
			var localeLanguage="en";
			var confirmMessage="";
			var confirmTitle="";
			var yes="Yes";
			var no="No";

			navigator.globalization.getLocaleName(function(locale)
					{
						if((locale.value=="zh_TW")||(locale.value=="zh_HK"))
						{
							localeLanguage="tc";
						}
						else if(locale.value=="zh_CN")
						{
							localeLanguage="sc";
						}
					},function(){});
									
			$.getJSON("json/exitApp.json",function(json)
			{
				eval("confirmMessage=json.confirmMessage."+localeLanguage+";");
				eval("confirmTitle=json.confirmTitle."+localeLanguage+";");
				eval("yes=json.yes."+localeLanguage+";");
				eval("no=json.no."+localeLanguage+";");
			});
	
			$(document).bind("backbutton",function()
					{
						if(device.platform=="Android")
						{
							navigator.notification.confirm(confirmMessage,function(button)
									{
										if(button==2)
										{
											navigator.app.exitApp();
										}
									},confirmTitle,no+","+yes);
						}
						else
						{
							navigator.notification.confirm(confirmMessage,function(button)
									{
										if(button==1)
										{
											navigator.app.exitApp();
										}
									},confirmTitle,yes+","+no);
						}
					});
		});