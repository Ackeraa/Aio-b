#include<iostream>
#include<string>

using namespace std;

const int N(1e6 + 9);

int n, m, ans;
int z[N], cnt[N];
string s;

void z_function(string s)
{
	int n = s.length();
	int l = 0, r = 0;
	for (int i=1;i<n;i++)
	{
		if (i <= r)
		{
			z[i] = min(z[i - l], r - i + 1);
		}
		while (i + z[i] < n && s[z[i]] == s[z[i] + i])
		{
			z[i]++;
		}
		if (i + z[i] - 1 > r)
		{
			l = i;
			r = i + z[i] - 1;
		}
	}
}
int main()
{
	cin>>s;
	n = s.length();
	z_function(s);
	for (int i=1;i<n;i++)
	{
		cnt[z[i]]++;
	}
	for (int i=n;i>=1;i--)
	{
		cnt[i] += cnt[i + 1];
	}
	/*for (int i=1;i<=n;i++)
	{
		cout<<z[i]<<' ';
	}
	cout<<endl;*/
	bool f = false;
	for (int i=1;i<n;i++)
	{
		if (i + z[i] == n && cnt[z[i]] > 1)
		{
			for (int j=i;j<n;j++)
			{
				cout<<s[j];
			}
			f = true;
			break;
		}
	}
	if (!f) cout<<"Just a legend"<<endl;
	return 0;
}
