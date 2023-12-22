window.onload = function () {
    buildList();
}

function deleteCard(cardNo) {
    document.getElementById("card" + cardNo).remove();
    document.cookie = cardNo + "provName=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "doh=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "dns1v4=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "dns2v4=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "dns1v6=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "dns2v6=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "serverUrl=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "exclWifi=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "exclDomains=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "useWifi=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "useCell=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "lockProfile=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
}

function editCard(cardNo) {
    var d = new Date();
    d.setTime(d.getTime() + (86400000)); // expires in 24h
    var expires = "expires=" + d.toUTCString();
    document.cookie = "editSelected=" + cardNo + ";" + expires + ";path=/; SameSite=Strict; Secure";

    window.location.href = 'tool.html';
}

function buildList() {
    var parent = document.getElementById("dynamicList");

    for (var i = 0; i < getCookie("runningNo"); i++) {
        if (getCookie(i + "provName") != "") {
            var carddiv = document.createElement("div");
            carddiv.classList.add("w3-card");
            carddiv.id = "card" + i;

            var header = document.createElement("header");
            header.classList.add("w3-container");
            header.classList.add("bar-color");

            var headertext = document.createElement("h3");
            headertext.classList.add("w3-left");
            headertext.appendChild(document.createTextNode(decodeURIComponent(getCookie(i + "provName"))));

            var headerdel = document.createElement("button");
            headerdel.classList.add("w3-button");
            headerdel.classList.add("w3-red");
            headerdel.classList.add("w3-right")
            headerdel.innerHTML = "X";
            headerdel.setAttribute("onclick", 'deleteCard(' + i + ')');

            var headeredit = document.createElement("button");
            headeredit.classList.add("w3-button");
            headeredit.classList.add("w3-dark-gray");
            headeredit.classList.add("w3-right")
            headeredit.innerHTML = "Edit";
            headeredit.setAttribute("onclick", 'editCard(' + i + ')');

            var infocontainer = document.createElement("div");
            infocontainer.classList.add("w3-container");

            var infop = document.createElement("p");

            var infostring = "Connection type: ";
            if (getCookie(i + "doh") == "true") {
                infostring += "DNS-over-HTTPS";
            } else {
                infostring += "DNS-over-TLS";
            } infop.appendChild(document.createTextNode(infostring));
            infop.appendChild(document.createElement("br"));
            var dns1v4 = getCookie(i + "dns1v4");
            var dns2v4 = getCookie(i + "dns2v4");
            var dns1v6 = getCookie(i + "dns1v6");
            var dns2v6 = getCookie(i + "dns2v6");
            var exclWifi = decodeURIComponent(getCookie(i + "exclWifi"));
            var exclDomains = decodeURIComponent(getCookie(i + "exclDomains"));

            if (dns1v4 != "") {
                infostring = "Primary IPv4 DNS Server: " + getCookie(i + "dns1v4");
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }
            if (dns2v4 != "") {
                infostring = "Secondary IPv4 DNS Server: " + dns2v4;
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }
            if (dns1v6 != "") {
                infostring = "Primary IPv6 DNS Server: " + dns1v6;
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }
            if (dns2v6 != "") {
                infostring = "Secondary IPv6 DNS Server: " + dns2v6;
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }

            infostring = "Server Address: " + getCookie(i + "serverUrl");
            infop.appendChild(document.createTextNode(infostring));
            infop.appendChild(document.createElement("br"));

            if (exclWifi != "") {
                infostring = "Excluded WiFi SSIDs: " + exclWifi;
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }

            if (exclDomains != "") {
                infostring = "Excluded domains: " + exclDomains;
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }

            infostring = "";

            if (getCookie(i + "useWifi") == "true") {
                infostring += "Enabled on WiFi. ";
            }
            if (getCookie(i + "useCell") == "true") {
                infostring += "Enabled on Cellular. ";
            }
            if (getCookie(i + "lockProfile" == "true")) {
                infostring += "Disablement prohibited. ";
            }
            infop.appendChild(document.createTextNode(infostring));

            header.appendChild(headertext);
            header.appendChild(headerdel);
            header.appendChild(headeredit);
            carddiv.appendChild(header);
            infocontainer.appendChild(infop);
            carddiv.appendChild(infocontainer);
            parent.appendChild(carddiv);
            document.getElementById("downloadBtn").disabled = false;
        }
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    }
}

function getRegDNS(iterator) {
    var dns1v4 = getCookie(iterator + "dns1v4");
    var dns2v4 = getCookie(iterator + "dns2v4");
    var dns1v6 = getCookie(iterator + "dns1v6");
    var dns2v6 = getCookie(iterator + "dns2v6");
    var ip4format = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var ip6format = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

    var returnarray = [];

    if (ip6format.test(dns1v6)) {
        returnarray.push(dns1v6);
    }
    if (ip6format.test(dns2v6)) {
        returnarray.push(dns2v6);
    }

    if (ip4format.test(dns1v4)) {
        returnarray.push(dns1v4);
    }
    if (ip4format.test(dns2v4)) {
        returnarray.push(dns2v4);
    }

    return returnarray;
}

function saveDynamicDataToFile() {
    //Basic json info
    var profilejson = {
        PayloadContent: [],
        PayloadDescription: "Adds different encrypted DNS configurations to Big Sur (or newer) and iOS 14 (or newer) based systems",
        PayloadDisplayName: "Encrypted DNS (DoH, DoT)",
        PayloadIdentifier: "com.notjakob.apple-dns." + uuidv4(),
        PayloadRemovalDisallowed: false,
        PayloadType: "Configuration",
        PayloadUUID: uuidv4(),
        PayloadVersion: 1
    }

    for (var i = 0; i < getCookie("runningNo"); i++) {
        var provName = getCookie(i + "provName");
        if (provName != "") { // This check is to avoid empty configurations leftover by deletion.
            var encValue = null;
            if (getCookie(i + "doh") == "true") {
                encValue = "HTTPS";
            } else {
                encValue = "TLS";
            }
            var exclWifi = decodeURIComponent(getCookie(i + "exclWifi"));
            var exclDomains = decodeURIComponent(getCookie(i + "exclDomains"));

            var settings = {
                DNSSettings: {
                    DNSProtocol: encValue,
                    ServerAddresses: getRegDNS(i)
                },
                OnDemandRules: [],
                PayloadDescription: "Configures device to use " + provName + " Encrypted DNS over " + encValue,
                PayloadDisplayName: provName + " DNS over " + encValue,
                PayloadIdentifier: "com.apple.dnsSettings.managed." + uuidv4(),
                PayloadType: "com.apple.dnsSettings.managed",
                PayloadUUID: uuidv4(),
                PayloadVersion: 1
            }

            if (encValue == "HTTPS") {
                settings.DNSSettings.ServerURL = getCookie(i + "serverUrl");
            } else {
                settings.DNSSettings.ServerName = getCookie(i + "serverUrl");
            }

            if (getCookie(i + "lockProfile") == "true") {
                settings.ProhibitDisablement = true;
            } else {
                settings.ProhibitDisablement = false;
            }

            if (exclWifi != "") {
                var wifirules = {
                    Action: "Disconnect",
                    SSIDMatch: []
                }
                exclWifi.split(/\s*,\s*/).forEach(function (wifiString) {
                    wifirules.SSIDMatch.push(wifiString);
                });

                settings.OnDemandRules.push(wifirules);
            }

            if (exclDomains != "") {
                var domainrules = {
                    Action: "EvaluateConnection",
                    ActionParameters: [
                        {
                            DomainAction: "NeverConnect",
                            Domains: []
                        }
                    ]
                }
                exclDomains.split(/\s*,\s*/).forEach(function (domainString) {
                    domainrules.ActionParameters[0].Domains.push(domainString);
                });

                settings.OnDemandRules.push(domainrules);
            }

            if (getCookie(i + "useWifi") == "true") {
                settings.OnDemandRules.push({
                    Action: "Connect",
                    InterfaceTypeMatch: "WiFi"
                });
            }

            if (getCookie(i + "useCell") == "true") {
                settings.OnDemandRules.push({
                    Action: "Connect",
                    InterfaceTypeMatch: "Cellular"
                });
            }

            settings.OnDemandRules.push({
                Action: "Disconnect"
            });

            profilejson.PayloadContent.push(settings);
        }
    }

    if (document.getElementById("systemChk").checked) {
        profilejson.PayloadScope = "System";
    }

    var fullplist = plist.build(profilejson);
    var blob = new Blob([fullplist], { type: "application/octet-stream;charset=utf-8" });

    var filename = "";
    var fd = new FormData();
    fd.append('data', blob);
    fd.append('sign', document.getElementById("signChk").checked);
    let request = new XMLHttpRequest();
    request.open("POST", "backend.php", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            let msg = this.response;
            filename = this.response;
            window.location.href = "/files/" + filename;
        }
    }
    request.onerror = function (bla, msg) {
        alert("Fail: " + msg);
    };
    request.send(fd);

    deleteAllCookies();
}

function confirmDel() {
    if (confirm("This will delete all configurations on this page. Continue?") == true) {
        deleteAllCookies();
        window.location.reload();
    }
}

function expandAccordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}