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

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

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

my $query = "select * from product where sku='$sku';";

            
my $sth = $dbh->prepare($query);
$sth->execute();

$count = $sth->rows;

while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) {    
        $response .= $item."|"; #field separator
        }
    $response = substr $response, 0, (length($response)-1);  
    $response .= "||";  #record separator
    } 
    $response = substr $response, 0, (length($response)-2);     

   
$sth->finish();
$dbh->disconnect();

print $response;               
