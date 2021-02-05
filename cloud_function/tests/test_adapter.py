import pytest
import adapter

job_run_id = '1'


def adapter_setup(test_data):
    a = adapter.Adapter(test_data)
    return a.result


@pytest.mark.parametrize('test_data', [
    {'id': job_run_id, 'data': {"account_id": 70388657, "stat": "leaderboard_rank"}},
    {'id': job_run_id, 'data': {"account_id": 94054712, "stat": "solo_competitive_rank"}},
    {'id': job_run_id, 'data': {"account_id": 70388657, "stat": "rank_tier"}},
])
def test_create_request_success(test_data):
    result = adapter_setup(test_data)
    print(result)
    assert result['statusCode'] == 200
    assert result['jobRunID'] == job_run_id
    assert result['data'] is not None
    assert type(result['result']) is int
    assert type(result['data']['result']) is int


@pytest.mark.parametrize('test_data', [
    {'id': job_run_id, 'data': {}},
    {},
])
def test_create_request_error(test_data):
    result = adapter_setup(test_data)
    print(result)
    assert result['statusCode'] == 500
    assert result['jobRunID'] == job_run_id
    assert result['status'] == 'errored'
    assert result['error'] is not None