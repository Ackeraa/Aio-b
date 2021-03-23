#include<iostream>
#include<cstring>

using namespace std;

const int N(1e6 + 9);

int n, m, ans;
char s[N];
int f[N];
bool b[N];

void findf()
{
	int i = 0, j = -1;
	f[0] = -1;
	while (i < n)
	{
		if (j == -1 || s[i] == s[j])
		{
			i++;
			j++;
			f[i] = j;
		}
		else
		{
			j = f[j];
		}
	}
}
int main()
{
	cin>>s;
	n = strlen(s);
	findf();
	for (int i=1;i<n;i++)
	{
		b[f[i]] = 1;
	}
	int i = n;
	while(f[i] != 0)
	{
		if (b[f[i]])
		{
			for (int j=0;j<f[i];j++)
			{
				cout<<s[j];
			}
			return 0;
		}
		i = f[i];
	}
	cout<<"Just a legend"<<endl;
	return 0;
}
