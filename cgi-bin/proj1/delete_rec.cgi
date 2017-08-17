#!/usr/bin/perl

use DBI;
use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
use CGI::Session;
use Crypt::SaltedHash;



my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn043";
my $username = "jadrn043";
my $password = "uphold";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";
my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn043SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
print $q->header( -cookie=>$cookie );
my $sid = $session->id;
if($cookie_sid ne $sid) {

$response="no";


print $response; 
return;
}

my $sku = $q->param("sku");


########################################################
### connect
my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

########################################################
### empty the products table
$dbh->do("DELETE FROM product where sku='$sku';");


$statement = "SELECT * from product where sku='$sku';";
	
my $sth = $dbh->prepare($statement);
$sth->execute();

while(my @row=$sth->fetchrow_array()) {    
    $response = $row[0];
    }
if($response) {
    $response = "error"; 
    }    
else {
    $response = "ok";
    } 

$sth->finish();
$dbh->disconnect();


print $response;  
