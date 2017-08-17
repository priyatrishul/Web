#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn043SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
print $q->header( -cookie=>$cookie );
my $sid = $session->id;

if($cookie_sid ne $sid) {
    print <<END;


<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn043/proj1/login/login.html" />
</head><body></body>
</html>

END
return;
}
print <<END;

<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn043/proj1/ajax_upload/delete.html" />
</head><body></body>
</html>

END
