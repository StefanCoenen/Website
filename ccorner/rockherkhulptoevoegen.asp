<%@LANGUAGE="VBSCRIPT" CODEPAGE="1252"%>
<!--#include file="connect.asp"-->
<%
' *** Restrict Access To Page: Grant or deny access to this page
MM_authorizedUsers="1,2,3,4,5"
MM_authFailedURL="index.asp"
MM_grantAccess=false
If Session("BL_username") <> "" Then
  If (false Or CStr(Session("BL_soort"))="") Or _
         (InStr(1,MM_authorizedUsers,Session("BL_soort"))>=1) Then
    MM_grantAccess = true
  End If
End If
If Not MM_grantAccess Then
  Response.Redirect("index.asp")
End If

id = request("id")
naam = request("naam")
set rsTaken = server.createobject("adodb.recordset")
rsTaken.activeconnection = con




sqlstring = "insert into tblrockherktaakverdeling VALUES("&id&",'"&naam&"',"&session("BL_lidid")&")"
con.execute sqlstring

sqlstring = "SELECT naam FROM tblrockherktaakverdeling WHERE taaknr = " & id
rs.open sqlstring
tel = 0
while not rs.eof
	tel = tel + 1
	response.Write(rs("naam"))
	if Session("BL_soort") < 4 then
		response.Write("&nbsp;<img src='min.gif' id='img_"&id&"_"&rs("naam")&"' class='imgMin' />")
	end if
	response.Write("<br>")
	rs.movenext
wend
rs.close

sqlstring = "SELECT * FROM  tblrockherktaken WHERE id = " &id
rsTaken.open sqlstring

if tel < rsTaken("aantal") then
	for x = (tel+1) to rsTaken("aantal")%>
    <div style='background-color: #FF0; width:100%'><img src="plus.gif" id="img_<%=id%>" class="imgPlus" /></div>
	<%next
else%>
    <img src="plus.gif" id="img_<%=id%>" class="imgPlus" />
<%end if

con.Close%>